const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, maxlength: 10 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
