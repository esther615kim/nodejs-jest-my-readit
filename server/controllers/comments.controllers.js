const { fetchComments,removeComment} = require('../models/comments.models');

exports.getComments = (req,res,next) =>{
    const article_id = req.params.id;
    console.log("article_id for comments",article_id)
    fetchComments(article_id)
    .then((comments)=>{
        res.status(200).send({comments}); 
    })
    .catch((err)=>{
        res.status(500).send({msg:"Internal server error"})
        // next(err);
    })
}

exports.deleteComment = (req,res,next)=>{

    const comment_id = req.params.id;
    removeComment(comment_id)
    .then(({rowCount})=>{
        if(rowCount) res.status(204).send({msg:"deleted"}).end();
        else return Promise.reject({status:404, msg:"Not found"});
    }).catch((err)=>{
        next(err);
    })
}