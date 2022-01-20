const db = require("../db/connection");

exports.fetchComments = (id) => {
  return db
    .query("SELECT * FROM comments where article_id=$1;", [id])
    .then((result) => result.rows);
};

exports.fetchAllComments = () => {
  return db.query("SELECT * FROM comments;").then((result) => result.rows);
};


exports.removeComment = (id) => {
  console.log("comment to delete:", id);
  return db.query("DELETE FROM comments where comment_id=$1;", [id]);
};


exports.addComment = (comment) => {
  const { username, body } = comment;

  return db
    .query(
      "select EXISTS (select * from users where username=$1 limit 1) as success;",
      [username]
    )
    .then((result) => {
      if (!result.rows[0].success) {
        return;
      } else {
        return db.query(
          "INSERT INTO comments (author,body) VALUES ($1,$2) RETURNING *;",
          [username, body]
        );
      }
    })
    .then((result) => {
      return result && result.rows[0];
    });
};
