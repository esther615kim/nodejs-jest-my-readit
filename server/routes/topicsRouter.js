const router = require("express").Router();

const {getTopics,deleteTopic} = require('../controllers/topics.controllers');

router.get('/', getTopics);

router.delete('/:id', deleteTopic);

// router.post('/topics', postTopics);


module.exports = router;