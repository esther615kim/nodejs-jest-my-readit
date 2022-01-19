const { fetchComments } = require('../models/comments.models');

exports.getComments = (req,res,next) =>{

    fetchComments()
    .then((comments)=>{
        res.status(200).send({comments}); 
    })
    .catch((err)=>{
        res.status(500).send({msg:"Internal server error"})
        // next(err);
    })
}