const db = require("../db/connection");


exports.fetchComments = async(id) => {
  const res = await db
    .query("SELECT * FROM comments where article_id=$1 ORDER BY created_at DESC;", [id]);
    
    return res.rows;
};

exports.fetchAllComments = async({sort_by="created_at",order="desc"}) => {

  if(sort_by ==="votes"){
    const res = await db.query(`SELECT * FROM comments ORDER BY votes ${order};`);
    return res.rows; 
  }
  else{
    const res = await db.query(`SELECT * FROM comments ORDER BY created_at ${order};`);
    return res.rows; 
  }

};

exports.fetchCommentById = async (id) => {

  const res = await db
  .query("SELECT * FROM comments where comment_id=$1;", [id]);

  console.log("all comments",res.rows[0]);
  
  return res.rows;
};


exports.removeComment = (id) => {

  return db
    .query(
      "select EXISTS (select * from comments where comment_id=$1 limit 1) as success;",
      [id]
    )
    .then((result) => {

      if (!result.rows[0].success) {
        return;
      } else {
        console.log("let's delete it")
        return db.query(
          "DELETE FROM comments WHERE comment_id=$1;",
          [id]
        );
      }
    })
    .then((result) => {
      return result; 
    });
   
};


exports.addComment = (comment,id) => {
  const { author, body } = comment;
  return db
    .query(
      "select EXISTS (select * from users where username=$1 limit 1) as success;",
      [author]
    )
    .then((result) => {
      console.log(!result.rows[0].success);
      if (!result.rows[0].success) {
        return;
      } else {
        return db.query(
          "INSERT INTO comments (author,body,article_id) VALUES ($1,$2,$3) RETURNING *;",
          [author, body,id]
        )
      }
    })
    .then((result) => {
      return result.rows[0]; 
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