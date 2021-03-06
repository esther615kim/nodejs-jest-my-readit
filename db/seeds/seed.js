const db = require('../connection');
const format = require("pg-format");
const { setTopicInfo,setUserInfo,setArticleInfo,setCommentInfo,articleRef } = require('./seed-formatting');

exports.seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables

  // drop any existing tables
  return db.query(`DROP TABLE IF EXISTS comments,articles,users,topics`)
    .then(() => {
      return db.query(`
    CREATE TABLE topics (
      slug VARCHAR(45) PRIMARY KEY,
      description VARCHAR(254) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE users (
      username VARCHAR(254) PRIMARY KEY,
      avatar_url VARCHAR(254) NOT NULL,
      name VARCHAR(254) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY NOT NULL,
      title VARCHAR(254) NOT NULL,
      body TEXT NOT NULL,
      votes SMALLINT DEFAULT 0 NOT NULL,
      topic VARCHAR(254) REFERENCES topics(slug) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      author VARCHAR(254) REFERENCES users(username)NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY NOT NULL,
        author VARCHAR(254) REFERENCES users(username) NOT NULL,
        article_id SERIAL REFERENCES articles(article_id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        votes SMALLINT DEFAULT 0 NOT NULL,
        body TEXT NOT NULL
      );`);
    })
    .then(() => {
      const sql = format(`INSERT INTO topics
      (description,slug)
      VALUES %L RETURNING *;`,setTopicInfo(topicData)
        )
        return db.query(sql);
    })
    .then(() => {
      const sql = format(`INSERT INTO users
      ( username,avatar_url,name)
      VALUES %L RETURNING *;`, setUserInfo(userData)
        )
        return db.query(sql);
    })
    .then(() => {
      const sql = format(`INSERT INTO articles
      (title,body,votes,topic,created_at,author)
      VALUES %L RETURNING *;`, setArticleInfo(articleData)
        )
        return db.query(sql);
    })
    .then((result)=>{
      const articleIds = articleRef(result.rows);

      const sql = format(`INSERT INTO comments
      (author,article_id,votes,created_at,body)
      VALUES %L RETURNING *;`, setCommentInfo(commentData, articleIds)
        )
        return db.query(sql);
      
    })
    .then((result)=>{
      console.log("tables all refreshed!");
      // console.log(result.rows);
    })
  }

// module.exports = seed;

//created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
