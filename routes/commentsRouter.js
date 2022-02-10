const router = require("express").Router();

const { getComments,deleteComment,postComment,getAllComments } = require('../controllers/comments.controllers');

router.get('/articles/:id/comments', getComments);

router.get('/comments',getAllComments);

router.delete('/comments/:id', deleteComment);

router.post('/articles/:id/comments', postComment);

module.exports = router;