const express = require("express");
const router = express.Router();
const {
  createTweet,
  getAllTweets,
  likeTweet,
  unlikeTweet,
  editTweet,
  deleteTweet,
} = require("../controllers/tweetController");
const protect = require("../middleware/auth");

router.get("/get", getAllTweets);
router.post("/post", protect, createTweet);
router.post("/:id/like", protect, likeTweet);
router.post("/:id/unlike", protect, unlikeTweet);
router.patch("/:id/edit", protect, editTweet);
router.delete("/:id/delete", protect, deleteTweet);

module.exports = router;
