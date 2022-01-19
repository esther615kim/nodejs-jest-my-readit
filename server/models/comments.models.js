const db = require('../db/connection');

exports.fetchComments = () => {
    return db.query("SELECT * FROM comments;")
        .then((result) => (result.rows));
};
