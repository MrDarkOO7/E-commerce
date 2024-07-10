const express = require("express");
require("./db/config");
const User = require("./db/users");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  //res.send(req.body);
  let user = await User.findOne(req.body).select("-password");
  if (user) {
    res.send(user);
  } else {
    res.send({ result: "User not found" });
  }
});

app.listen(5000);
