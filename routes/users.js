const express = require('express');
const router = express.Router();
//Import Controller
const userController = require("../controllers/users_controller");

//Create Router
router.get("/profile", userController.profile);

module.exports = router;