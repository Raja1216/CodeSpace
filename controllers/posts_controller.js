const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = function (req, res) {
  const userPost = {
    content: req.body.content,
    user: req.user._id,
  };
  Post.create(userPost)
    .then((post) => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating Post", err);
      return;
    });
};

module.exports.destroy = (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    .then((post) => {
      // (_id).id means converting the object id into a string
      // if (post.user == req.user.id)
      Comment.deleteMany({ post: post._id })
        .then((comment) => {
          return res.redirect("back");
        })
        .catch((err) => {
          console.log("Error in Deleting Comments", err);
          return res.redirect("back");
        });
    })
    .catch((err) => {
      console.log("Post id is Invalid", err);
      return res.redirect("back");
    });
};
