const db = require('../db/connection');

exports.fetchUsers = () => {
    return db.query("SELECT * FROM users;")
        .then((result) => (result.rows));
};

exports.fetchUserByUsername = (username)=>{
    return db.query("SELECT * FROM users WHERE username=$1;",[username])
    .then((result) => (result.rows[0]))
    .catch((err)=>{
        console.log(err);
        // next(err);
    })
}


