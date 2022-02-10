const db = require('../db/connection.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const testData = require('../db/data/test-data/index.js');
const app = require('../app');

afterAll(() => db.end());

describe('topicRouter', () => {

    beforeEach(() => {
        return seed(testData);
    });

    describe('GET/articles', () => {

      test.only('200: should respond with an array of object', () => {
          return request(app)
              .get('/api/topics')
              .expect(200)
              .then((res) => {
                  expect(res.body.articles).toBeInstanceOf(Array);
                  expect(res.body.articles).toHaveLength(3);
              })
      })
    })

    describe("POST",()=>{

        test("201: should return the newly updated data",()=>{
          return request(app)
          .post('/topics')
          .send({"slug":"dogs","description":"Not Cats"})
          .expect(201)
          .then((res) => {
              expect(res.body.topic).toBeInstanceOf(Object);
              expect(res.body.topic.slug).toBe("dogs");
              expect(res.body.topic.description).toBe("Not Cats");
          })
        });
    
        test("422: Resource already exists",()=>{
          return request(app)
          .post('/topics')
          .send({"slug":"cats","description":"Not Cats"})
          .expect(422)
          .then((res)=>{
            expect(res.body.msg).toBe("Resource already exists");
        })
          })
        });

}) // end
