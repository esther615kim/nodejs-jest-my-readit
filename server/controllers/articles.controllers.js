const {
  fetchArticles,
  fetchArticleById,
  updateArticle,
  removeArticle,
  addArticle,
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  const { sort_by } = req.query;

  fetchArticles(sort_by)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const article_id = req.params.id;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const article_id = req.params.id;
  const update = req.body.votes; //

  const numberChecker = /^(\s|\d)+$/;

  if (!numberChecker.test(update)) {
    return res.status(422).send({ msg: "Invalid input" });
  }

  updateArticle(article_id, update)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const article_id = req.params.id;

  removeArticle(article_id)
    .then(({ rowCount }) => {
      if (rowCount) {
        return res.status(204).send({ msg: "deleted" }).end();
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticle = (req, res, next) => {

  const newArticle = req.body;
  const requiredKeys = ["author","title","body","topic"];

  //validation for req obj (keys & length)
  if (!Object.keys(newArticle).length===4 ||
     (!requiredKeys.every(key=> Object.keys(newArticle).includes(key)))){
    
    console.log("validation failed");
    return res.status(418).send({ msg: "I'm a teapot" });
  }
    addArticle(newArticle)
    .then((article) => {
      article
        ? res.status(201).send({ article })
      : res.status(422).send({msg:"Invalid input" });
    })
    .catch((err) => {
      next(err);
    });
};
