const Post = require("../models/post");

module.exports.home = function (req, res) {
  //Get posts for the current user populate is use for get user table data from user id
  Post.find({})
    .populate("user")
    //Populate nested relations for post comments and users
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("Error in geting Post", err);
      return;
    });
};

//module.export.actionName = function(req, res) {}
