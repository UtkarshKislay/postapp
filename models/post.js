const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creatorImg: {
    type: String,
    required: true,
  },
  displayName:{
       type:String,
       required:true
  },
  createdBy: {
    type: String,
    default: "Unknown",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post = mongoose.model("post", postSchema);
module.exports = Post;
