const mongoose = require("mongoose");

const postShema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postShema);

module.exports = Post;
