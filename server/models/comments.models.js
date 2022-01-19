const db = require("../db/connection");

exports.fetchComments = (id) => {
  return db.query("SELECT * FROM comments where article_id=$1;",[id])
  .then((result) => result.rows);
};

exports.removeComment = (id) => {
    console.log("comment to delete:",id)
    return db.query("DELETE FROM comments where comment_id=$1;",[id]);
};
