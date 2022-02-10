// error handlng - siwtch?

exports.handleErrors = (err, req, res, next) => {
    if(err.status) 
    res.status(err.status).send({ msg: err.msg });
    
    else if (err.code === "22P02") 
    res.status(400).send({ msg: "Bad request" }); 
    
    else 
    res.status(500).send({ msg: "Internal server error" });
};

// to do: pagination middleware
