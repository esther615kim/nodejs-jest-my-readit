const {
  fetchArticles,
  fetchArticleById,
  updateArticle,
  removeArticle,
  addArticle,
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  const {sort_by}= req.query;
  const {order} = req.query;
  const query = req.query;

  const sortBys = ["created_at","author","title","article_id","topic","votes"];
  const orders =["asc","desc"]

  // input check1 
  if (sort_by && !sortBys.includes(sort_by)||(order && !orders.includes(order))) {

    return res.status(400).send({ msg: "Bad bad request" });

  }else{

    fetchArticles(query)
    .then((articles) => {
      articles.length? res.status(200).send({ articles }) 
      : res.status(404).send({ msg: "Nothing found" });
    })
    .catch((err) => {
      next(err);
    });
  }
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
  const update = req.body.votes; 

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
