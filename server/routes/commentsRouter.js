const router = require("express").Router();

const { getComments,deleteComment } = require('../controllers/comments.controllers');

router.get('/articles/:id/comments', getComments);

router.delete('/comments/:id', deleteComment)

module.exports = router;