const db = require("../db/connection");

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics;")
    .then((result) => result.rows);
};

exports.removeTopic = (id) => {
  console.log("Topic to delete:", id);
  return db.query("DELETE FROM topics where topic_id=$1;", [id]);
};
