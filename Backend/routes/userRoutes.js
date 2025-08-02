const express = require("express");
const router = express.Router();
const {
  getUsers,
  register,
  login,
  followUsers,
} = require("../controllers/userController");
const protect = require("../middleware/auth");

router.get("/get", getUsers);
router.post("/register", register);
router.post("/login", login);
router.patch("/follow", protect, followUsers);

module.exports = router;
