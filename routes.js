const express = require('express')
const router = express.Router();
const {validateToken } = require("./JWT");
const { register, login, getUsers,logout } =require('./UserController');

router.post('/api/register',register)
router.post('/api/login',login)
router.get('/api/users',validateToken,getUsers)
router.get('/api/logout', logout);
module.exports = router;