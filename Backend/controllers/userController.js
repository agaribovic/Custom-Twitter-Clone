const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const followUsers = async (req, res) => {
  const { _id: currentUserId, following: newFollowingList } = req.body;

  try {
    if (!currentUserId || !Array.isArray(newFollowingList)) {
      return res
        .status(400)
        .json({ message: "User ID and following list are required." });
    }

    const filteredFollowing = newFollowingList.filter(
      (id) => typeof id === "string" && id !== currentUserId
    );

    const updatedUser = await User.findByIdAndUpdate(
      currentUserId,
      { following: filteredFollowing },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Following list successfully updated.",
      following: updatedUser.following,
    });
  } catch (error) {
    console.error("Error updating following list:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { getUsers, register, login, followUsers };
