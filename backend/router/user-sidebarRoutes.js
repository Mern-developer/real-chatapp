const express =require('express');
const protectedRoutes = require('../middleware/protectedRoutes');
const { getallUser } = require('../controller/userController');

const router = express.Router();

router.get('/get-alluser', protectedRoutes, getallUser);


module.exports= router