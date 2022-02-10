const express = require("express");
const app = express();

const {handleErrors} =require('./utils/mddileware');

require("dotenv").config();

const routes = require('./routes');

app.use(express.json());
app.use('/api',routes);


app.all("*", (req, res) => {
  console.log("handle 404s");
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handleErrors);


module.exports = app;
