const express = require('express');
const router = express.Router();
//Import Controller
const homeController = require("../controllers/home_controller");


//Create Router
router.get("/", homeController.home);
//If Request is comming from users that go to users router
router.use('/users', require('./users'));
//If Request is comming from posts that go to posts router
router.use('/posts', require('./posts'));



module.exports = router;