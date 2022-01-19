const router = require("express").Router();

const { getComments } = require('../controllers/comments.controllers');

router.get('/', getComments);


module.exports = router;