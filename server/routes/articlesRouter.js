const router = require("express").Router();

const { getArticles,getArticleById, postArticle } = require('../controllers/articles.controllers');

router.get('/',getArticles);

router.get('/:id',getArticleById);

router.post('/',postArticle);

// router.post('/create',createArticle);

module.exports = router;