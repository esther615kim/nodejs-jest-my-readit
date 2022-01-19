const { fetchArticles, fetchArticleById, updateArticleById } = require('../models/articles.models');

exports.getArticles = (req,res,next) =>{

    const {sort_by} = req.query;
    fetchArticles(sort_by)
    .then((articles)=>{
        res.status(200).send({articles}); 
    })
    .catch((err)=>{
        next(err);
    })
}

exports.getArticleById =(req,res,next)=>{
    const article_id = req.params.id;
    console.log("id info",typeof article_id, article_id);

    fetchArticleById(article_id)
    .then((article)=>{
        res.status(200).send({article}); 
    })
    .catch((err)=>{
        next(err);
    })
}

exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    updateArticleById(article_id, req.body)
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  };
