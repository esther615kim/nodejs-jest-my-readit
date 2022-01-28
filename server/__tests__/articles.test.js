const db = require('../db/connection.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const testData = require('../db/data/test-data/index.js');
const app = require('../app');
const { keys } = require('../db/data/test-data/articles.js');

afterAll(() => db.end());

describe('articleRouter', () => {

    beforeEach(() => {
        return seed(testData);
    });
 
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

    describe('GET/articles', () => {

        test('200: should respond with an array of articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((res) => {
                    expect(res.body.articles).toBeInstanceOf(Array);
                    expect(res.body.articles).toHaveLength(12);
                })
        })

        test('200: should be sorted by date by default', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((res) => {
                    expect(res.body.articles).toBeSorted({ descending: true });
                    // .toBeSortedBy('created_at',{ descending: true});
                })
        })


        test('400: invalid input in sort_by query', () => {
            return request(app)
            .get('/api/articles?sort_by=cats')
            .expect(400)
            .then((res) => {
                expect(res.body.msg).toBe("Bad bad request");
            })
        })

    })

    describe('GET/articles/:id', () => {

        test('200: should return an article object',()=>{
            return request(app)
                .get('/api/articles/3')
                .expect(200)
                .then((res) => {
                    expect(res.body.article.article_id).toBe(3);
                    expect(res.body.article).toBeInstanceOf(Object);
                })
        }),

        test('400: Invalid ID',()=>{
            return request(app)
                .get('/api/articles/cake')
                .expect(400)
                .then((res) => {
                    console.log(res.body)
                    expect(res.body.msg).toBe("Invalid input");
                })
        }),

        // fix this one⚽

        test.only('404: non existent ID',()=>{
            return request(app)
                .get('/api/articles/9999')
                .expect(404)
                .then((res) => {
                    console.log(res.body)
                    expect(res.body.msg).toBe("non existent ID");;
                })
        })

        test('400: invalid inc_votes type',()=>{

        })
        test('200: missing inc_votes keys',()=>{

        })
    })

    describe("PATCH/articles/:id", () => {

          test("200: should return the updated article ", () => {
            return request(app)
            .patch('/api/articles/3')
            .send({"votes":3})
            .expect(200)
            .then((res) => {
                expect(res.body.article).toBeInstanceOf(Object);
                expect(res.body.article.votes).toBe(3);
            })
          });

          test("200: only update 'votes' and ignore other inputs", () => {
            return request(app)
            .patch('/api/articles/6')
            .send({"votes":12, "message":"I'm hungry"})
            .expect(200)
            .then((res) => {
                expect(res.body.article).toBeInstanceOf(Object);
                expect(res.body.article.votes).toBe(12);
            })
          });

          test("422: unprocessable Entity",()=>{
            return request(app)
            .patch('/api/articles/6')
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
                .delete("/api/articles/9999")
                .expect(404)
                .then((res)=>{
                    expect(res.body.msg).toBe("Not found");
                })
            });
        
            test("204: article deleted successfully ", () => {
              return request(app)
                .delete("/api/articles/7")
                .expect(204)
                .then((res) => console.log(res.body));
            });
          });

          describe("POST",()=>{

            test("201: should return the newly updated data",()=>{
              return request(app)
              .post('/api/articles')
              .send({"author":"lurker","title":"Morning","body":"everyone!","topic":"cats"})
              .expect(201)
              .then((res) => {
                  expect(res.body.article).toBeInstanceOf(Object);
                  expect(res.body.article.topic).toBe("cats");
                  expect(res.body.article.title).toBe("Morning");
              })
            });

            test("422: Invalid input",()=>{
                return request(app)
                .post('/api/articles')
                .send({"author":"lurker","title":"Morning","body":"everyone!","topic":"dogs"})
                .expect(422)
                .then((res) => {
                    expect(res.body.msg).toBe("Invalid input");
                })
              });
        
            test("418: I'm a teapot",()=>{
              return request(app)
              .post('/api/articles')
              .send({"author":"lurker","title":"Morning"})
              .expect(418)
              .then((res)=>{
                expect(res.body.msg).toBe("I'm a teapot");
            })
              })
            });

        });
