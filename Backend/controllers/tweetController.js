const Tweet = require("../models/Tweet");

const createTweet = async (req, res) => {
  try {
    const tweet = await Tweet.create({
      user: req.user.id,
      content: req.body.content,
    });
    res.status(201).json(tweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate("user", "username")
      .select("-__v");

    const formatted = tweets.map((tweet) => ({
      ...tweet.toObject(),
      likeCount: tweet.likes.length,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: "Tweet not found" });

    if (tweet.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Tweet already liked" });
    }

    tweet.likes.push(req.user.id);
    await tweet.save();

    res.status(200).json({ msg: "Tweet liked", likes: tweet.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: "Tweet not found" });

    tweet.likes = tweet.likes.filter(
      (userId) => userId.toString() !== req.user.id
    );
    await tweet.save();

    res.status(200).json({ msg: "Tweet unliked", likes: tweet.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editTweet = async (req, res) => {
  const { content } = req.body;

  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });

    if (
      tweet.user.toString() !== req.user.id &&
      !req.user.username.toLowerCase() === "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You can only edit your own tweets" });
    }

    if (content) tweet.content = content;

    await tweet.save();

    // Populate user with username for the updated tweet
    const updatedTweet = await Tweet.findById(req.params.id).populate(
      "user",
      "username"
    );

    res
      .status(200)
      .json({ message: "Tweet updated successfully", tweet: updatedTweet });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ msg: "Tweet not found" });
    }

    // Ensure only the owner or admin can delete
    if (
      tweet.user.toString() !== req.user.id &&
      req.user.username.toLowerCase() !== "admin"
    ) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await tweet.deleteOne();
    res.status(200).json({ msg: "Tweet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTweet,
  getAllTweets,
  likeTweet,
  unlikeTweet,
  editTweet,
  deleteTweet,
};
