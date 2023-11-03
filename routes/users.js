const express = require('express');
const router = express.Router();
//Import Controller
const userController = require("../controllers/users_controller");

//Create Router
router.get("/profile", userController.profile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);


router.post('/create', userController.create);

module.exports = router;