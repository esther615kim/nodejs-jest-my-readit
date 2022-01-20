const { fetchTopics,removeTopic} = require('../models/topics.models');


exports.getTopics = (req,res,next) =>{

    fetchTopics()
    .then((topics)=>{
        console.log("all topics",topics);
        res.status(200).send({topics}); 
    })
    .catch((err)=>{
        next(err);
    })
}

// needs fixing
exports.deleteTopic = (req,res,next)=>{

    const topic_id = req.params.id;
    removeTopic(topic_id)
    .then(({rowCount})=>{
        if(rowCount){
            res.status(204).send({msg:"deleted successfully"}).end();
        } else {
            return Promise.reject({status:404, msg:"Not found"});
        }
    }).catch((err)=>{
        next(err);
    })
}
