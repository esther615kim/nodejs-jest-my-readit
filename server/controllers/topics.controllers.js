const { fetchTopics,removeTopic, addTopic} = require('../models/topics.models');


exports.getTopics = (req,res,next) =>{

    fetchTopics()
    .then((topics)=>{
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

exports.postTopics =(req,res,next)=>{

    const newTopic = req.body;

    addTopic(newTopic)
    .then((topic) =>{
        topic ? 
        res.status(201).send({topic}) 
        : res.status(422).send({msg:"Resource already exists" });
    }
    )
    .catch((err)=>{
        next(err);
    })
}
