const db = require("../db/connection");

exports.fetchArticles = (sort_by = "created_at") => {
  const sortBys = ["author", "created_at"]; // 'topic' => filtering

  // error handling:400
  if (!sortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(`SELECT * FROM articles ORDER BY ${sort_by} ASC;`)
    .then((result) => {
      return result.rows;
    })
    .catch(
      (err) => {
        console.log(err)
      });
};

exports.fetchArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id=$1;", [id])
    .catch((err) => {
      console.log(err)
    });
};

exports.updateArticleById = (article_id, articleUpdate) => {
  const { inc_votes: newVote } = articleUpdate;
  return db
    .query(
      `UPDATE articles SET votes = ${newVote} WHERE article_id = ${article_id} RETURNING *;`
    )
    .then(({ rows }) => {
      return rows[0];
    });
};