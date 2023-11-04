const express = require("express");
const router = express.Router();
const passport = require("passport");
//Import Controller
const postsController = require("../controllers/posts_controller");

router.post("/create-post",passport.checkAuthentication, postsController.createPost);
router.get("/destroy/:id",passport.checkAuthentication, postsController.destroy);

module.exports = router;