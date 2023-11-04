const mongoose = require("mongoose");

const commentShema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentShema);

module.exports = Comment;
