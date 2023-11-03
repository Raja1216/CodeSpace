const express = require('express');
const router = express.Router();
//Import Controller
const homeController = require("../controllers/home_controller");


//Create Router
router.get("/", homeController.home);



module.exports = router;