const express = require("express");
const router = express.Router();
const { registerUser, login, getUser } = require("./authController");
const authenticate = require("./middelware");

router.post("/register", registerUser);
router.post("/login", login);

//auth route - to get his own profile
router.get("/getUser", authenticate, getUser);

module.exports = router;
