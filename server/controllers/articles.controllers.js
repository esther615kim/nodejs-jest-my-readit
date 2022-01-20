const { fetchArticles, fetchArticleById, updateArticle } = require('../models/articles.models');

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
    fetchArticleById(article_id)
    .then((article)=>{
        res.status(200).send({article}); 
    })
    .catch((err)=>{
        next(err);
    })
}

exports.patchArticle = (req, res, next) => {
    const article_id = req.params.id;
    const update = req.body.votes;

    updateArticle(article_id,update)
    // .then(result=>console.log(result))
    // //   .then((article) => {
    // //     console.log(article);
    // //     res.status(200).send({ article });
    // //   })
    // .catch((err)=>{
    //     next(err);
    // })
  };
