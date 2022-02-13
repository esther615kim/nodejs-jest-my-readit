const db = require("../db/connection");


exports.fetchComments = async(id) => {
  const res = await db
    .query("SELECT * FROM comments where article_id=$1;", [id]);

    // console.log("all comments",res.rows);
    
    return res.rows;
};

exports.fetchAllComments = async() => {
   const res = await db.query("SELECT * FROM comments;");
   
   return res.rows; 
};

exports.fetchCommentById = async (id) => {

  const res = await db
  .query("SELECT * FROM comments where comment_id=$1;", [id]);

  console.log("all comments",res.rows[0]);
  
  return res.rows;
};


exports.removeComment = (id) => {
  console.log("comment to delete:", id);
  // to add: check if it exists
  return db
    .query(
      "select EXISTS (select * from comments where comment_id=$1 limit 1) as success;",
      [id]
    )
    .then((result) => { console.log(result)})
   
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

exports.updateComment = async(id, update) => {
  
  console.log("comment_id:", id, "votes:", update);

   const response = await db
    .query("UPDATE comments SET votes=votes+$1 WHERE comment_id=$2 RETURNING *;", [
      update,
      id,
    ]);

    return response.rows[0];
};