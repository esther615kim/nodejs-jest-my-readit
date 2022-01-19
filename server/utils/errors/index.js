exports.handlePsqlErrors = (req, res) => {
    (err.code === "22P02") ? res.status(400).send({ msg: "Bad request" }) : next(err);

}

exports.handleCustomErrors = (err, req, res, next) => {
    (err.status) ? res.status(err.status).send({ msg: err.msg }) : next(err);
}

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error" });

}

exports.handle404s = (req, res) => {
    console.log("handle 404s");
    res.status(404).send({ msg: "Invalid URL" });

}