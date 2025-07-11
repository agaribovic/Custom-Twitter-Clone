const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/twitter-backend");

const run = async () => {
  try {
    const hashedPassword = await bcrypt.hash("user", 10); // hash the password

    await User.create({
      username: "user",
      email: "user@example.com",
      password: hashedPassword,
    });

    console.log("✅ User inserted with hashed password");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

run();
