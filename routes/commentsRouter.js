const router = require("express").Router();

const { getArticleComments,deleteComment,postComment,getCommentById,getAllComments,patchComment } = require('../controllers/comments.controllers');

router.get('/articles/:id/comments', getArticleComments);

router.get('/comments',getAllComments);

router.get('/comments/:id',getCommentById);

router.delete('/comments/:id', deleteComment);

router.patch("/comments/:id", patchComment);

router.post('/articles/:id/comments', postComment);

module.exports = router;