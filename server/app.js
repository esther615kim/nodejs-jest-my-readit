const express = require("express");
const app = express();

const {handleErrors} =require('./utils/mddileware');

require("dotenv").config();
const PORT = process.env.PORT || 9090;
const routes = require('./routes');

app.use(express.json());
app.use('/api',()=>{
  console.log("browser")
});


app.all("*", (req, res) => {
  console.log("handle 404s");
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handleErrors);

app.listen(PORT, (err) => {
  if(err) throw err;
  console.log("Server is listening on port...");
});

module.exports = app;
