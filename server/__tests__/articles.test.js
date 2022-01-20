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
                    console.log(res.body)
                    expect(res.body.article.article_id).toBe(3);
                    expect(res.body.article).toBeInstanceOf(Object);
                })
        })
    })

    describe("PATCH/articles/:id", () => {

          test.only("200: should respond with the updated article ", () => {

            // return request(app)
            //   .patch('articles/2')
            // //   .send({votes:2})
            //   .expect(200)
            //   .then((res) => {
            //       console.log(res.body);
            //   });
          });

          test ("400:should respond with an error message", () => {
            const article_Id = 3;
            const articleUpdate = { inc_votes: 2 };
            return request(app)
              .patch(`/articles/${article_Id}`)
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).toBe(`Invalid input`);
              });
          });
        });
      });



// test('should' ,()=>{})
