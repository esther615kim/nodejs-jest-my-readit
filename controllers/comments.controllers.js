const { fetchComments,removeComment,addComment, updateComment,fetchAllComments} = require('../models/comments.models');

exports.getComments = (req,res,next) =>{

    const article_id = req.params.id;
    console.log(article_id);
    fetchComments(article_id)
    .then((comments)=>{
        res.status(200).send({comments}); 
    })
    .catch((err)=>{
        next(err);
    })
}

exports.getAllComments  = (req,res,next) =>{

    fetchAllComments()
    .then((comments)=>{
        res.status(200).send({comments}); 
    })
    .catch((err)=>{
        next(err);
    })
}

exports.deleteComment = (req,res,next)=>{

    const comment_id = req.params.id;

    removeComment(comment_id)
    // .then(({rowCount})=>{
    //     if(rowCount) {
    //         res.status(204).send({msg:"deleted"}).end();
    //     }else{
    //         return Promise.reject({status:404, msg:"Not found"});
    //     }
    // }).catch((err)=>{
    //     next(err);
    // })
}

exports.postComment = (req,res,next)=>{

    const newComment = req.body;
    addComment(newComment)
    .then((comment) =>{
        comment ? res.status(201).send({comment}) 
        : res.status(404).send({msg:"Invalid user" });
    }
    )
    .catch((err)=>{
        next(err);
    })
}


exports.patchComment = (req, res, next) => {
    const comment_id = req.params.id;
    const update = req.body.votes;
  
    const numberChecker = /^(\s|\d)+$/;
  
    if (!numberChecker.test(update)) {
      return res.status(422).send({ msg: "Invalid input" });
    }
  
    updateComment(comment_id, update)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  };