
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificado: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetTokenExpires: Date
});

module.exports = mongoose.model("User", userSchema);
