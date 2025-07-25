const express = require("express");
const { getUser } = require("../service/auth.service");
const URL = require("../models/url.model");
const { restrictTo } = require("../middlewares/auth.guard");

const router = express.Router();

router.get("/admin", restrictTo(['ADMIN']), async (req, res) => {
  const token = req?.cookies?.token;
  if (!token) return res.redirect("/login");
  const authUser = getUser(token);
  if (!authUser) return res.redirect("/login");
  const allUsers = await URL.find({ });
  res.render("home", {
    generatedURL: "",
    userDetails: allUsers,
  });
});

router.get("/", restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
  const token = req?.cookies?.token;
  // const token = req.headers?.authorization?.split(" ")[1];
  console.log("Token from get / path : ", token)
  if (!token) return res.redirect("/login");
  const authUser = getUser(token);
  if (!authUser) return res.redirect("/login");
  const allUsers = await URL.find({ createdBy: authUser._id });
  res.render("home", {
    generatedURL: "",
    userDetails: allUsers,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
