const router = require("express").Router();

const { getUsers, getUsersByUsername} = require('../controllers/users.controllers');

router.get('/',getUsers);

router.get('/:id', getUsersByUsername);

module.exports = router;