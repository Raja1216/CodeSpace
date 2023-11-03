const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//Static file call
app.use(express.static('./assets'));

//Use ejs Layouts for every route or views
app.use(expressLayouts);

//Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set("layout extractScripts", true);

//use express router
app.use('/', require('./routes'));
//use View Engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Listening on port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error to listen: ${err}`);
  }
  console.log(`Express server listening on port: ${port}`);
});
