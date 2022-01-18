const db = require('../db/connection');

exports.fetchArticles = () => {
    return db.query("SELECT * FROM articles;")
        .then((result) => (result.rows));
};


exports.fetchArticleById = (id)=>{
    return db.query("SELECT * FROM articles WHERE article_id=$1;",[id])
    .then((result) => (result.rows[0]))
    .catch((err)=>{
        console.log(err);
        // next(err);
    })
}

exports.addArticle = (article)=>{
    console.log("hi",article);
}