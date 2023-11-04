const Post = require("../models/post");

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


