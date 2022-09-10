const router = require('express').Router();
const {getUsers, getSingleUser, createUser, deleteUser} = require('../controllers/userController');


module.exports = router;