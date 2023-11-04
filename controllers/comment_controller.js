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

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .populate("post")
    .then((comment) => {
      if (comment.user == req.user.id || comment.post.user == req.user.id) {
        let post_id = comment.post._id;
        comment.deleteOne();

        Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } })
          .then((post) => {
            return res.redirect("back");
          })
          .catch((err) => {
            console.log("Error in Updating post", err);
            return;
          });
      } else {
        console.log("Error in Finiding the Comment1");
        return;
      }
    })
    .catch((err) => {
      console.log("Error in Finiding the Comment");
      return;
    });
};
