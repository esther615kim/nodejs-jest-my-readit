const router = require("express").Router();

const {getTopics,deleteTopic,postTopics} = require('../controllers/topics.controllers');

router.get('/', getTopics);

router.delete('/:id', deleteTopic);

router.post('/', postTopics);


module.exports = router;