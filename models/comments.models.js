const db = require("../db/connection");


exports.fetchComments = async(id) => {
  const res = await db
    .query("SELECT * FROM comments where article_id=$1;", [id]);

    console.log("all comments",res.rows);
    
    return res.rows;
};

exports.fetchAllComments = async() => {
   const res = await db.query("SELECT * FROM comments;");
   
   return res.rows; 
};

exports.fetchCommentById = async (id) => {

  const res = await db
  .query("SELECT * FROM comments where comment_id=$1;", [id]);

  console.log("all comments",res.rows);
  
  return res.rows;
};

  // if(res.rows[0].success){
  //   const nextRes = await db
  //   .query(
  //     `SELECT articles.*, COUNT(comments.article_id) 
  //   AS comment_count FROM articles 
  //   LEFT JOIN comments ON articles.article_id = comments.article_id
  //  WHERE articles.article_id = $1 GROUP BY articles.article_id`,
  //     [id]
  //   );
  //   console.log(nextRes.rows[0])
  //   return nextRes.rows[0];
  // }
  // console.log("article_id not valid")




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
  
  console.log("comment:", id, "votes:", update);

   const response = await db
    .query("UPDATE comments SET votes=$1 WHERE article_id=$2 RETURNING *;", [
      update,
      id,
    ]);

    console.log("votes added",response.rows[0])
    return response.rows[0];
};