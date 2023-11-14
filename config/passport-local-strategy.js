const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

//Model
const User = require("../models/user");

//Authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a user and establish the indentity
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "Invalid Username/password");
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((err) => {
          req.flash("error", err);
          return done(err);
        });
    }
  )
);

//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in Finding User in Passport");
      return done(err);
    });
});

//Check the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //If the user is sign in
  if (req.isAuthenticated()) {
    return next();
  }
  // if user is not Authenticated
  return res.redirect("/users/sign-in");
};

//Set the user to the view
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
