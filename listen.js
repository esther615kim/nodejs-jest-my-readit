const app = require('./app');
const PORT =  
// process.env.PORT || 
9090;

// require("dotenv").config();

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("Server is listening on port...");
  });