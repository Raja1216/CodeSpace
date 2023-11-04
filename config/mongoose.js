const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codespace_dev');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connenting to mongodb"));

db.once('open', function () {
   console.log("Connected to DB"); 
});

module.exports = db;