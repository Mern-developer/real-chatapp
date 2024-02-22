const express =require('express');
const { sendmessasgeController, getMessage } = require('../controller/messsageController.js');
const protectedRoutes = require('../middleware/protectedRoutes.js');

const router = express.Router();

router.get('/get-messages/:id', protectedRoutes, getMessage);
router.post('/send/:id', protectedRoutes, sendmessasgeController);

module.exports = router;