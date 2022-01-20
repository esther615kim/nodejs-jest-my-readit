const router = require("express").Router();

const { getArticles, getArticleById,patchArticle} = require('../controllers/articles.controllers');

router.get('/', getArticles);

router.get('/:id', getArticleById);

router.patch('/:id', patchArticle);

// router.post('/', postArticle);

// router.delete('/', deleteArticle)

// router.post('/create',createArticle);

module.exports = router;