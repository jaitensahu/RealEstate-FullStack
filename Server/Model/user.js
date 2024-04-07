const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.freepik.com/512/7153/7153150.png",
  },
  properties: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "properties",
  },
});
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("password", salt);
// console.log("bcrypt", salt, hash);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
