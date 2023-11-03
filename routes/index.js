const express = require('express');
const router = express.Router();
//Import Controller
const homeController = require("../controllers/home_controller");


//Create Router
router.get("/", homeController.home);
//If Request is comming from users that go to users router
router.use('/users', require('./users'));



module.exports = router;