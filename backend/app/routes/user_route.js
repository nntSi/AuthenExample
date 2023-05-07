const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = path.join(__dirname, '..', '..', 'fileupload', 'profile_img');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, './fileupload/profile_img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({storage});

router.post('/user/create', upload.single('file'), userController.createUser);
router.post('/user/update', upload.single('file'), userController.updateUser);
router.post('/user/update/password', userController.updatePassword);

module.exports = router;