const db = require('../connection');
const format = require("pg-format");
const { seedTopicInfo,seedUserInfo,seedArticleInfo,seedCommentInfo} = require('./seed-formatting');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables

  // drop any existing tables
  return db.query(`DROP TABLE IF EXISTS comments,articles,users,topics`)
    .then(() => {
      return db.query(`
    CREATE TABLE topics (
      slug VARCHAR(45) PRIMARY KEY,
      description VARCHAR(255) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY,
      avatar_url VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY NOT NULL,
      title VARCHAR(255),
      body TEXT NOT NULL,
      votes SMALLINT DEFAULT 0,
      topic VARCHAR(255) REFERENCES topics(slug),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      author VARCHAR(255) REFERENCES users(username)
    );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(255) REFERENCES users(username),
        article_id SERIAL REFERENCES articles(article_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes SMALLINT DEFAULT 0,
        body TEXT
      );`);
    })
    .then(() => {
      const sql = format(`INSERT INTO topics
      (description,slug)
      VALUES %L RETURNING *;`,seedTopicInfo(topicData)
        )
        return db.query(sql);
    })
    .then(() => {
      const sql = format(`INSERT INTO users
      ( username,avatar_url,name)
      VALUES %L RETURNING *;`, seedUserInfo(userData)
        )
        return db.query(sql);
    })
    .then(() => {
      const sql = format(`INSERT INTO articles
      (title,body,votes,created_at)
      VALUES %L RETURNING *;`, seedArticleInfo(articleData)
        )
        return db.query(sql);
    })
    .then(()=>{
      console.log("all updated2");
    })
    .then(()=>{
      // add slugs
      return db.query(`
      INSERT INTO articles
      (topic,author)
      SELECT slug
      FROM topics
      VALUES
      ();`
      )
    })
    
  }
module.exports = seed;

//created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
// 