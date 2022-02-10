const router = require("express").Router();

const {
  getArticles,
  getArticleById,
  patchArticle,
  deleteArticle,
  postArticle,
} = require("../controllers/articles.controllers");

router.get("/", getArticles);

router.get("/:id", getArticleById);

router.patch("/:id", patchArticle);

router.delete("/:id", deleteArticle);

router.post("/", postArticle);

module.exports = router;
