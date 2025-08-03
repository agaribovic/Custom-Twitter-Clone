const express = require("express");
const router = express.Router();
const {
  getUsers,
  register,
  login,
  followUsers,
  deleteUser,
  deleteTweetsByUser,
} = require("../controllers/userController");
const protect = require("../middleware/auth");

router.get("/get", getUsers);
router.post("/register", register);
router.post("/login", login);
router.patch("/follow", protect, followUsers);
router.delete("/:id/delete", protect, deleteUser);
router.delete("/userTweets/:id", protect, deleteTweetsByUser);

module.exports = router;
