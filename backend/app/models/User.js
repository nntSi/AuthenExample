const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    date_of_birth: Date,
    firstname: String,
    lastname: String,
    profile_img: String,
    token: String
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
