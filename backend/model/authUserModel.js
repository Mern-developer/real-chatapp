const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: String,
  userName: String,
  password: String,
  gender: {type: String,
  enum: ['male', 'female']},
  profilePic: { type: String, default: "" },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
