const { response } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email, password });
    console.log(user, "user");
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login2", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/edituser", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.verified = req.body.verified;
    user.phone = req.body.phone;
    user.role = req.body.role;
    user.code = req.body.code;
    await user.save();
    res.send("User updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/adduser", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send("User added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.body.userid });
    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
