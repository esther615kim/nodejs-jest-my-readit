const db = require("../db/connection");

exports.fetchUsers = async () => {
  const response = await db.query("SELECT * FROM users;");
  
  return response.rows;
};

exports.fetchUserByUsername = async(username) => {
    const res = await db
    .query("SELECT * FROM users WHERE username=$1;", [username]);

    return res.rows[0];
};
