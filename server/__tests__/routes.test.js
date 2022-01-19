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
    describe('GET/api/articles', () => {

        test('200: should respond with an array of articles', () => {
            request(app)
                .get('/api/articles')
                .expect(200)
                .then((res) => {
                    console.log("body", res.body);
                    expect(res.body.articles).toBeInstanceOf(Array);
                    expect(res.body.articles).toHaveLength(12); // should fail?
                })
        })

        test('200: should be sorted by date by default', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then((res) => {
                    expect(res.body.articles).toBeSortedBy('created_at');
                })
        })

        test('400: invalid sort_by column', () => {
            return request(app)
                .get('/api/articles?sort_by=weird_column')
                .expect(400)
                .then((res) => {
                    expect(res.body.msg).toBe('Bad request');
                })
        })


    }) // describe GET/articles

    describe('GET/api/articles/:id', () => {
        test('200:should return a single article object' ,()=>{
        })
    })

});

describe('userRouter', () => {
})

//         test('should' ,()=>{})
