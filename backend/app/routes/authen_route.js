const express = require('express');
const router = express.Router();
const authenController = require("../controller/authController");

router.post('/login', authenController.Login);
router.post('/restore/login', authenController.restoreLogin);

module.exports = router;