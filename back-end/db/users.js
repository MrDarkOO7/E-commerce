const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017/e-commerce')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  numProducts: { type: Number, default: 0 },
});

module.exports = mongoose.model("users", userSchema);
