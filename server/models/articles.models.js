const db = require("../db/connection");

exports.fetchArticles = (sort_by = "created_at") => {
  const sortBys = ["author", "created_at"]; // 'topic' => filtering

  // error handling:400
  if (!sortBys.includes(sort_by)) {
    return res.status(400).send({msg:"Bad request" });
    }
  
  return db
    .query(`SELECT * FROM articles ORDER BY ${sort_by} ASC;`)
    .then((result) => result.rows)
    .catch(
      (err) => {
        console.log(err)
      });
};

exports.fetchArticleById = (id) => {
  return db
    .query(`SELECT articles.*, COUNT(comments.article_id) 
    AS comment_count FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
   WHERE articles.article_id = $1 GROUP BY articles.article_id`,[id])
    .then(({ rows }) => {
      return rows[0]
    })
};

exports.updateArticle = (id, update) => {
  console.log("article:",id,"votes:",update);
  return db
    .query("UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *;",[update,id])
    .then((result) => {
      return result.rows[0];
    })
};

exports.removeArticle = (id) => {
  console.log("article to delete:",id)
  return db.query("DELETE FROM articles where article_id=$1;",[id]);
};

// exports.fetchArticleById = (id) => {
//   return db
//     .query("SELECT * FROM articles WHERE article_id=$1;", [id])
//     .then((result) => {
//       return result.rows[0]
//     })
// };
