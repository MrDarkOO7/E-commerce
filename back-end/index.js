const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDB = async () => {
  mongoose.connect("mongodb://localhost:27017");
  const productSchema = new mongoose.Schema({});
  const product = mongoose.model("Product", productSchema);
  const data = await product.find();
  console.warn(data);
};
connectDB();

app.listen(5000);
