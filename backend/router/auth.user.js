const express = require('express');
const { login, logout, signUp } =require('../controller/authUser.js');


const router =express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/logout', logout);

module.exports = router;