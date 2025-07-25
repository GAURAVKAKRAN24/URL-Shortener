const express = require("express");
const { handleSignUp, handleUserLogin } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleUserLogin)

module.exports = router;
