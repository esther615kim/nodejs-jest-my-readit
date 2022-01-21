const db = require("../db/connection");

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics;")
    .then((result) => result.rows);
};

exports.removeTopic = (id) => {
  console.log("Topic to delete:", id);
  return db.query("DELETE FROM topics where topic_id=$1;", [id]);
};

exports.addTopic = (topic) => {
  const { slug,description } = topic;

  console.log(slug,description);
  // check if the topic already exists
  return db
    .query(
      "select EXISTS (select * from topics where slug=$1 limit 1) as success;",
      [slug]
    )
    .then((result) => {
      if (result.rows[0].success) {
        return;
      } else {
        return db.query(
          "INSERT INTO topics (slug,description) VALUES ($1,$2) RETURNING *;",
          [slug,description ]
        );
      }
    })
    .then((result) => {
      return result && result.rows[0];
    });
};
