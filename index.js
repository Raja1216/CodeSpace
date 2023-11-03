const express = require("express");
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes'));





// Listening on port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error to listen: ${err}`);
  }
  console.log(`Express server listening on port: ${port}`);
});
