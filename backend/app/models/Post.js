const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    img: String,
    content: String,
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
