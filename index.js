const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//Use for session cookiees
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const coustomMiddleWare = require("./config/middleware");


app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());

//Static file call
app.use(express.static("./assets"));

//Use ejs Layouts for every route or views
app.use(expressLayouts);

//Extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Session Use with Passport
//Mongo store is used to store session cookies in the DB
app.use(
  session({
    name: "codeSpace",
    // TODO change the secret before deployment in production
    secret: "codeSP",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //milisecond
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1/codespace_dev',
        mongooseConnection:db,
        autoRemove: 'disabled'
    }, function(err){
      console.log(err || "connect mogodb server ok");
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Set Authenticated User
app.use(passport.setAuthenticatedUser);

//Flash Messages
app.use(flash());
app.use(coustomMiddleWare.setFlash);

//use express router
app.use("/", require("./routes"));

// Listening on port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error to listen: ${err}`);
  }
  console.log(`Express server listening on port: ${port}`);
});

//Fisrt we have to set session then call routes.
