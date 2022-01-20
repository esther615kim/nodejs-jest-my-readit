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
                    expect(res.body.articles).toBeInstanceOf(Array);
                    expect(res.body.articles).toHaveLength(12);
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
        test('200: should return an article object',()=>{
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

          test("200: should return the updated article ", () => {
            return request(app)
            .patch('/articles/3')
            .send({"votes":3})
            .expect(200)
            .then((res) => {
                expect(res.body.article).toBeInstanceOf(Object);
                expect(res.body.article.votes).toBe(3);
            })
          });

          test("200: only update 'votes' and ignore other inputs", () => {
            return request(app)
            .patch('/articles/6')
            .send({"votes":12, "message":"I'm hungry"})
            .expect(200)
            .then((res) => {
                expect(res.body.article).toBeInstanceOf(Object);
                expect(res.body.article.votes).toBe(12);
            })
          });

          test("422: unprocessable Entity",()=>{
            return request(app)
            .patch('/articles/6')
            .send({"votes":"cake", "message":"I'm hungry"})
            .expect(422)
            .then((res) => {
                // console.log(res)
                expect(res.body.msg).toBe("Invalid input");
            })
          })
        });

        describe("DELETE/articles/:id", () => {
            
            test("404: Not found", () => {
              return request(app)
                .delete("/articles/9999")
                .expect(404)
                .then((res)=>{
                    expect(res.body.msg).toBe("Not found");
                })
            });
        
            test("204: article deleted successfully ", () => {
              return request(app)
                .delete("/articles/7")
                .expect(204)
                .then((res) => console.log(res.body));
            });
          });


        }); // end
        



// test('should' ,()=>{})
