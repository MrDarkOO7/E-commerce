const express = require("express");
require("./db/config");
const User = require("./db/users");
const Product = require("./db/product");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const jwtkey = "e-commerce";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();

  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send("somethign went wrong");
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  //res.send(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("somethign went wrong");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "User not found" });
    }
  } else {
    res.send({ result: "User not found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);

  let user = req.body.userId;
  console.log(user);
  let update = await User.findOneAndUpdate(
    { _id: user },
    { $inc: { numProducts: 1 } }
  );

  let result = await product.save();
  res.send(result);
});

app.get("/products/:loggedInID", verifyToken, async (req, res) => {
  let products = await Product.find({ userId: req.params.loggedInID });
  if (products.length > 0) res.send(products);
  else res.send({ result: "No products found" });
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No results found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  //res.send(req.params.id);
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.put("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});

app.get("/getCount/:loggedInID", verifyToken, async (req, res) => {
  const result = await User.findOne(
    {
      _id: req.params.loggedInID,
    },
    { numProducts: 1, _id: 0 }
  );

  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    //console.log("middleware called", token);
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.send({ result: "Provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Provide a token with the header" });
  }
}

app.listen(5000);
