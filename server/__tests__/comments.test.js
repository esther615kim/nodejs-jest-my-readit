const db = require("../db/connection.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const app = require("../app");

afterAll(() => db.end());

describe("commentsRouter", () => {
  beforeEach(() => {
    return seed(testData);
  });

  // 404: invalid URL
  describe("404: /invalid_url", () => {
    test("404: Invalid URL", () => {
      return request(app)
        .get("/weird_url")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid URL");
        });
    });
  });

  describe("GET/articles/:id/comments", () => {
    test("200:should return an array of objects", () => {
      return request(app)
        .get("/articles/3/comments")
        .expect(200)
        .then((res) => {
        //   console.log("res body:",res.body);
          expect(res.body.comments).toBeInstanceOf(Array);
        });
    });
  });

  describe("DELETE/comments/:id/", () => {
    test("404:NOT found", () => {
      return request(app)
        .delete("/comments/9999")
        .expect(404)
        .then((res) => {
         console.log(res.body); // {}
        });
    });

    test("204", () => {
      return request(app)
        .delete("/comments/3")
        .expect(204)
        .then((res) => console.log(res.body));
    });
  });
});
