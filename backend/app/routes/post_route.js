const express = require('express');
const router = express.Router();
const multer  = require("multer");
const postController = require("../controller/postController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './fileupload/post_img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

router.post('/post/create', upload.single('file'), postController.createPost);
router.get('/post/getall/:user_id', postController.getAllPost);

module.exports = router;