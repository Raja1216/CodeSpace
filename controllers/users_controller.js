const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
  });
};

//render Sign In Page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

//render Sign Up Page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {

        User.create(req.body)
          .then((result) => {
            return res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log("Error in creating user in sign Up", err);
            return;
          });
        
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error in finding user in sign Up", err);
      return;
    });
};

// get the sign In data
module.exports.createSession = function (req, res) {};
