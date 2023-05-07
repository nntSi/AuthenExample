const express = require('express');
const router = express.Router();
const path = require("path");
// authen
router.use(require('./app/routes/authen_route'));

// user
router.use(require('./app/routes/user_route'));

// post
router.use(require('./app/routes/post_route'));

// static
router.use('/img/user/profile/', express.static(path.join(__dirname, 'fileupload/profile_img')));
router.use('/img/post/', express.static(path.join(__dirname, 'fileupload/post_img')));


module.exports = router;