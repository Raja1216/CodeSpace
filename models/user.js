const mongoose = require("mongoose");

//Setup multer for file upload
const multer = require("multer");
const path = require("path");
const AVTER_PATH = path.join("upload/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    avatar:{
      type: String,

    }
  },
  {
    timestamps: true,
  }
);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..',AVTER_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

// static methods
userSchema.statics.uploadAvater = multer({ storage: storage }).single('avatar');
userSchema.statics.avaterPath = AVTER_PATH;


const User = mongoose.model("User", userSchema);
module.exports = User;
