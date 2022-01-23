const db = require("../db/connection");

exports.fetchComments = async(id) => {
  const res = await db
    .query("SELECT * FROM comments where article_id=$1;", [id]);

    return res.rows;
};

exports.fetchComments = async(id) => {
  const res = await db
    .query("SELECT * FROM comments where article_id=$1;", [id]);
    
    return res.rows[0];
};

exports.fetchAllComments = async() => {
   const res = await db.query("SELECT * FROM comments;");
   
   return res.rows; 
};


exports.removeComment = async(id) => {
  console.log("comment to delete:", id);
  const res = await db.query("DELETE FROM comments where comment_id=$1;", [id]);
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
