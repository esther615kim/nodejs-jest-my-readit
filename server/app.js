const express = require("express");
const app = express();

require("dotenv").config();
const {PORT} = process.env;
const port = 9090;

const topicsRouter = require("./routes/topicsRouter");
const articlesRouter = require("./routes/articlesRouter");
const usersRouter = require("./routes/usersRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use(express.json());

app.use("/articles", articlesRouter);
app.use("/users", usersRouter);
app.use("/", commentsRouter);
app.use("/topics", topicsRouter);
// app.use('/votes', votesRouter);

// anything else incl 404s
app.all("*", (req, res) => {
  console.log("handle 404s");
  res.status(404).send({ msg: "Invalid URL" });
});

// general error handlng
app.use((err, req, res, next) => {
  err.status ? res.status(err.status).send({ msg: err.msg }) : next(err);
});

// handle psql erros
app.use((err, req, res, next) => {
  err.code === "22P02" ? res.status(400).send({ msg: "Bad request" }) : next(err);
});

// handle server errors
app.use((err, req, res, next) => {
  console.log("500:", err);
  res.status(500).send({ msg: "Internal server error" });
});

app.listen(PORT||port, (err) => {
  if(err) throw err;
  console.log("Server is listening on port...");
});

module.exports = app;
