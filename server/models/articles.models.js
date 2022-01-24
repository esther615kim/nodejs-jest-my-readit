const db = require("../db/connection");

exports.fetchArticles = ({ sort_by = "created_at", order="desc", topic}) => {

  // need refactoring idea here (DRY)
  if(topic){
    return db
    .query(`SELECT * FROM articles WHERE topic in ($1) ORDER BY $2 ${order.toUpperCase()};`,[topic,sort_by])
    .then(({rows}) => rows)
  }else{
    return db
    .query(`SELECT * FROM articles ORDER BY $1 ${order.toUpperCase()};`,[sort_by])
    .then(({rows}) => rows)
  } 
};

exports.fetchArticleById = async (id) => {

  const response = await db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) 
    AS comment_count FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
   WHERE articles.article_id = $1 GROUP BY articles.article_id`,
      [id]
    );

    return response.rows[0];
};

exports.updateArticle = async(id, update) => {
  
  console.log("article:", id, "votes:", update);

   const response = await db
    .query("UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *;", [
      update,
      id,
    ]);

    return response.rows[0];
};


// working but why?
exports.removeArticle = async(id) => {
  console.log("article to delete:", id);

  // return db.query("ALTER TABLE comments DROP CONSTRAINT comments_author_fkey;")
  const res = await db.query("select * from information_schema.table_constraints where table_name = 'comments';");

  const nextRes = await db.query("DELETE FROM articles where article_id=$1;", [id]);
  // .then(()=>{
  //   "ALTER TABLE comments ADD CONSTRAINT comments_author_fkey FOREIGN KEY(article_id) REFERENCES articles(article_id) ON DELETE CASCADE;" 
  // })
  return nextRes.rowCount;
  // .then(({rowCount})=> ({rowCount}));
};


exports.addArticle = async(article) => {

  const { author, title, body, topic } = article;

  // check 1 valid user
  // const res = await db
  // .query(
  //   "select EXISTS (select * from users where username=$1 limit 1) as success;",
  //   [author]
  // );

  // const restNext = await (res.rows[0].success) && db.query(
  //   "select EXISTS (select * from topics where slug=$1 limit 1) as success;",
  //   [topic]
  // );

  // const 
  
  //   // .then((result) => {
  //   //   if (!result.rows[0].success) {
  //   //     return;
  //   //   } else {
  //   //     // check 2 existing topic
  //   //     return 
  //   //   }
  //   // })


  //   .then((result) => {
  //     if (!result.rows[0].success) {
  //       return;
  //     } else {
  //       // to add- comment_count
  //       return db.query(
  //         "INSERT INTO articles (author, title, body, topic ) VALUES ($1,$2,$3,$4) RETURNING *;",
  //         [author, title, body, topic]
  //       );
  //     }
  //   })


  //   .then((result) => {
  //     return result && result.rows[0];
  //   });

};

