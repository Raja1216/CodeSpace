const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
  Post.findById(req.body.post)
    .then((post) => {
      const userComment = {
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      };
      Comment.create(userComment)
        .then((comment) => {
          //Adding comment id into post table
          post.comments.push(comment);
          post.save();

          return res.redirect("back");
        })
        .catch((err) => {
          console.log("Error in creating Post", err);
          return;
        });
    })
    .catch((err) => {
      console.log("Post id is Invalid", err);
      return;
    });
};
