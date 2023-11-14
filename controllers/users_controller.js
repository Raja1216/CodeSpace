const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id)
    .then((user) => {
      return res.render("user_profile", {
        title: "Profile",
        profile_user: user,
      });
    })
    .catch((err) => {
      console.log("Error in getting user profile", err);
      return;
    });
};

//render Sign In Page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

//render Sign Up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
module.exports.createSession = function (req, res) {
  //Use Falsh Message
  req.flash('success','Logged In Successfully');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.updateUser = function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      return res.redirect("back");
    })
    .catch((err) => {
      return res.status(401).send('Unauthorized');
    });
};
