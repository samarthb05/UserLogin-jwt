const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  editUser,
  deleteUser,
  getUser,
} = require("./controller");
const authenticate = require("./middelware");

router.post("/register", registerUser);
router.post("/login", login);
router.patch("/editUser", authenticate, editUser);
router.delete("/deleteUser", authenticate, deleteUser);
router.get("/getUser", authenticate, getUser);

module.exports = router;
