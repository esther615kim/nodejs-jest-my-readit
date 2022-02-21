const db = require("../db/connection");

exports.fetchArticles = ({ sort_by = "created_at", order = "desc", topic }) => {
  console.log("query",sort_by,order,topic);

  if (topic) {

    return db
      .query(
        `SELECT * FROM articles WHERE topic in ($1) ORDER BY ${sort_by} ${order};`,
        [topic]
      )
      .then(({ rows }) => {
        return rows;
      });

  } else {
  //   // default
    return db
      .query(`SELECT * FROM articles ORDER BY ${sort_by} ${order};`)
      .then(({ rows }) => {
        return rows;
      });
  }
};

exports.fetchArticleById = async (id) => {
  const res = await db.query(
    "select EXISTS (select * from articles where article_id=$1 limit 1) as success;",
    [id]
  );

  if (res.rows[0].success) {
    const nextRes = await db.query(
      `SELECT articles.*, COUNT(comments.article_id) 
    AS comment_count FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
   WHERE articles.article_id = $1 GROUP BY articles.article_id`,
      [id]
    );
    console.log(nextRes.rows[0]);
    return nextRes.rows[0];
  }
  console.log("article_id not valid");
};

exports.updateArticle = async (id, update) => {
  console.log("article:", id, "votes:", update);

  const response = await db.query(
    "UPDATE articles SET votes=votes+$1 WHERE article_id=$2 RETURNING *;",
    [update, id]
  );

  return response.rows[0];
};

// working but why?
exports.removeArticle = async (id) => {
  console.log("article to delete:", id);

  const res = await db.query(
    "select * from information_schema.table_constraints where table_name = 'comments';"
  );

  const nextRes = await db.query("DELETE FROM articles where article_id=$1;", [
    id,
  ]);
  return nextRes.rowCount;
};

exports.addArticle = async (newArticle) => {
  //   const { author, title, body, topic } = newArticle;
  //   console.log(author,title,body,topic);

  //   const res = await db
  //   .query(
  //     "select EXISTS (select * from users where username=$1 limit 1) as success;",
  //     [author]
  //   );

  //   if(res.rows){
  //     const nextRes = await db
  //   db.query(
  //             "INSERT INTO articles (author, title, body, topic ) VALUES ($1,$2,$3,$4) RETURNING *;",
  //             [author, title, body, topic]
  //           );

  //      return console.log("nextRes", nextRes);
  //       // return nextRes.rows;
  //   };
  // };

  const { author, title, body, topic } = newArticle;

  return db
    .query(
      "select EXISTS (select * from users where username=$1 limit 1) as success;",
      [author]
    )
    .then((result) => {
      if (!result.rows[0].success) {
        return;
      } else {
        // check 2 existing topic
        return db.query(
          "select EXISTS (select * from topics where slug=$1 limit 1) as success;",
          [topic]
        );
      }
    })
    .then((result) => {
      if (!result.rows[0].success) {
        return;
      } else {
        // to add- comment_count
        return db.query(
          "INSERT INTO articles (author, title, body, topic ) VALUES ($1,$2,$3,$4) RETURNING *;",
          [author, title, body, topic]
        );
      }
    })
    .then((result) => {
      return result && result.rows[0];
    });
};
