const express = require('express');
const app = express();

require('dotenv').config();
// const PORT = process.env.PORT
const PORT =9090;

const articlesRouter = require('./routes/articlesRouter');
const usersRouter = require('./routes/usersRouter');
app.use(express.json());

app.use('/articles', articlesRouter);
app.use('/users', usersRouter);
// app.use('/comments', commentsRouter);
// app.use('/votes', votesRouter);




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
