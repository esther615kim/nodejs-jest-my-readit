// error handlng - fix it

exports.handleErrors = (err, req, res, next) => {
  switch (err) {
    case "status":
      err.status && res.status(err.status).send({ msg: err.msg });
      break;

    case "22P02":
    err.code === "22P02"&& res.status(400).send({ msg: "Bad request" });
      break;

    default:
      res.status(500).send({ msg: "Internal server error" });
  }
};

// to do: pagination middleware
