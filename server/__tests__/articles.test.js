const db = require('../db/connection.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const testData = require('../db/data/test-data/index.js');
const app = require('../app');

afterAll(() => db.end());

describe('articleRouter', () => {

    beforeEach(() => {
        return seed(testData);
    });

// 404: invalid URL 
    describe("404: /invalid_url",()=>{
        test("404: Invalid URL",()=>{
            return request(app)
            .get("/weird_url")
            .expect(404)
            .then((res)=>{
                expect(res.body.msg).toBe("Invalid URL");
            })
        })
    })

// articles
    describe('GET/articles', () => {

        test('200: should respond with an array of articles', () => {
            return request(app)
                .get('/articles')
                .expect(200)
                .then((res) => {
                    console.log("length",res.body.articles.length)
                    expect(res.body.articles).toBeInstanceOf(Array);
                    expect(res.body.articles).toHaveLength(12); // should fail?
                })
        })

        test('200: should be sorted by date by default', () => {
            return request(app)
                .get('/articles')
                .expect(200)
                .then((res) => {
                    expect(res.body.articles).toBeSortedBy('created_at');
                })
        })

        test('400: invalid sort_by column', () => {
            return request(app)
            .get('/articles/5')
            .expect(200)
        })


    }) // describe GET/articles

    describe('GET/articles/:id', () => {
        test('200:should return a single article object',()=>{
            return request(app)
                .get('/articles/3')
                .expect(200)
                .then((res) => {
                    console.log(res)
                    // expect(res.body.articles).toHaveLength(1); // should fail?
                })
        })
    })

    describe("PATCH", () => {
        describe("/api/articles/:article_id", () => {

          test("200: should respond with the updated article ", () => {
            const article_Id = 3;
            // const articleUpdate = { inc_votes: 2 };
            return request(app)
              .patch(`/api/articles/${article_Id}`)
              .send(articleUpdate)
              .expect(200)
              .then(({ body }) => {
                expect(body.articles).toEqual({
                  article_id: 3,
                  title: "Eight pug gifs that remind me of mitch",
                  topic: "mitch",
                  author: "icellusedkars",
                  body: "some gifs",
                  created_at: "2020-11-03T09:12:00.000Z",
                  votes: 2,
                });
              });
          });

          test ("400:should respond with an error message", () => {
            const article_Id = 3;
            const articleUpdate = { inc_votes: 2 };
            return request(app)
              .patch(`/api/articles/${article_Id}`)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(`Invalid input`);
              });
          });
        });
      });

});


// test('should' ,()=>{})
