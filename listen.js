const app = require('./app');
const PORT = 8080 || process.env.PORT;

// require("dotenv").config();

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("Server is listening on port...");
  });