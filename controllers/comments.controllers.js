const { fetchComments,removeComment,addComment,fetchCommentById , updateComment,fetchAllComments} = require('../models/comments.models');

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
    .then(({rowCount})=>{
      console.log("result",rowCount);
      
        if(rowCount) {
            res.status(204).send({msg:"deleted"}).end();
        }else{
            return Promise.reject({status:404, msg:"Comment Not found"});
        }
    }).catch((err)=>{
        next(err);

    })
}

exports.postComment = (req,res,next)=>{

    const newComment = req.body;
    const {id} = req.params;

    addComment(newComment,id)
    .then((comment) =>{
      console.log("updated comment",comment)
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
  
    updateComment(comment_id, update)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  };


  exports.getCommentById = (req, res, next) => {
    const comment_id = req.params.id;
    console.log("comment_id",comment_id);
  
    function isNumber(v){
      const reg = /^(\s|\d)+$/;
      return reg.test(v);
    }
  
    // case: not a number
  if(!isNumber(parseInt(comment_id))) {
    return res.status(400).send({ msg: "Invalid input" });
  }
   
  fetchCommentById(comment_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
  };