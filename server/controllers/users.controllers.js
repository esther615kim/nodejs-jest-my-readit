const { fetchUsers,fetchUserByUsername } = require('../models/users.models');

exports.getUsers = (req,res,next) =>{

    fetchUsers()
    .then((users)=>{
        res.status(200).send({users}); 
    })
    .catch((err)=>{
        res.status(500).send({msg:"Internal server error"})
        // next(err);
    })
}

exports.getUsersByUsername=(req,res,next)=>{
    const username = req.params.id;
    console.log(username)

    fetchUserByUsername(username)
    .then((user)=>{
        res.status(200).send({user}); 
    })
    .catch((err)=>{
        res.status(500).send({msg:"Internal server error"})
        // next(err);
    })
}