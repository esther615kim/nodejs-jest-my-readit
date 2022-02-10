const express = require("express");
const app = express();
const cors = require('cors');

const {handleErrors} =require('./utils/mddileware');

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/api',routes);


app.all("*", (req, res) => {
  console.log("handle 404s");
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handleErrors);


module.exports = app;
