const router = require("express").Router();

const { getArticles, getArticleById,patchArticleById} = require('../controllers/articles.controllers');

router.get('/', getArticles);

router.get('/:id', getArticleById);

router.patch('/', patchArticleById);

// router.post('/', postArticle);

// router.delete('/', deleteArticle)

// router.post('/create',createArticle);

module.exports = router;