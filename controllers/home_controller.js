const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  //Get posts for the current user populate is use for get user table data from user id
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      //Populate nested relations for post comments and users
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});
    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

//module.export.actionName = function(req, res) {}
