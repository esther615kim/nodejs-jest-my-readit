const { fetchArticles, fetchArticleById,addArticle } = require('../models/articles.models');

exports.getArticles = (req,res,next) =>{

    const {sort_by} = req.query;
    fetchArticles(sort_by)
    .then((articles)=>{
        res.status(200).send({articles}); 
    })
    .catch(next);
    // .catch((err)=>{
    //    res.status(500).send({msg:"Internal server error"})
    //     next(err);
    // })
}

exports.getArticleById =(req,res,next)=>{
    const article_id = req.params.id;
    console.log("id info",typeof article_id, article_id);

    fetchArticleById(article_id)
    .then((article)=>{
        res.status(200).send({article}); 
    })
    .catch((err)=>{
        // res.status(500).send({msg:"Internal server error"})
        next(err);
    })
}

exports.postArticle =(req,res)=>{
    const article= req.body;
    addArticle(article);
}