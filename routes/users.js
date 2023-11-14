const express = require("express");
const router = express.Router();
const passport = require("passport");
//Import Controller
const userController = require("../controllers/users_controller");

//Create Router
router.get("/profile/:id",passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-out", userController.destroySession);

router.post("/create", userController.create);
router.post("/update/:id", userController.updateUser);

//Use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate('local', { failureRedirect: "users/sign-in" }),
  userController.createSession
);

module.exports = router;
