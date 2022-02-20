const {
  fetchArticleComments,
  removeComment,
  addComment,
  fetchCommentById,
  updateComment,
  fetchAllComments,
} = require("../models/comments.models");

exports.getArticleComments = (req, res, next) => {
  const article_id = req.params.id;
  const { sort_by } = req.query;
  const sortBys = ["created_at", "votes"];
  
  // input check
  if (sort_by && !sortBys.includes(sort_by)){
    return res.status(400).send({ msg: "Bad bad request" });
  } else {

  fetchArticleComments(sort_by,article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
  }
};

exports.getAllComments = (req, res, next) => {

  const { sort_by } = req.query;
  const { order } = req.query;
  const query = req.query;

  const sortBys = ["created_at", "votes"];
  const orders = ["asc", "desc"];

  // input check
  if (
    (sort_by && !sortBys.includes(sort_by)) ||
    (order && !orders.includes(order))
  ) {
    return res.status(400).send({ msg: "Bad bad request" });
  } else {
    fetchAllComments(query)
      .then((comments) => {
        comments.length
          ? res.status(200).send({ comments })
          : res.status(404).send({ msg: "Nothing found" });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.deleteComment = (req, res, next) => {
  const comment_id = req.params.id;

  removeComment(comment_id)
    .then(({ rowCount }) => {
      console.log("result", rowCount);

      if (rowCount) {
        res.status(204).send({ msg: "deleted" }).end();
      } else {
        return Promise.reject({ status: 404, msg: "Comment Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const newComment = req.body;
  const { id } = req.params;

  addComment(newComment, id)
    .then((comment) => {
      console.log("updated comment", comment);
      comment
        ? res.status(201).send({ comment })
        : res.status(404).send({ msg: "Invalid user" });
    })
    .catch((err) => {
      next(err);
    });
};

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
  console.log("comment_id", comment_id);

  function isNumber(v) {
    const reg = /^(\s|\d)+$/;
    return reg.test(v);
  }

  // case: not a number
  if (!isNumber(parseInt(comment_id))) {
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
