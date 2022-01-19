const db = require("../db/connection");

exports.fetchArticles = (sort_by = "created_at") => {
  const sortBys = ["author", "created_at"]; // 'topic' => filtering

  // error handling:400
  if (!sortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  return db
    .query(`SELECT * FROM articles ORDER BY ${sort_by} ASC;`)
    .then((result) => {
    //   console.log("SORTED DESC:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      next(err);
    });
};

exports.fetchArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id=$1;", [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      next(err);
    });
};

exports.addArticle = (article) => {
  console.log("hi", article);
};
