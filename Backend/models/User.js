const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require("./Message");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, maxlength: 10 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Auto-delete chat messages when user is deleted
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Message.deleteMany({ sender: this._id });
    next();
  }
);

module.exports = mongoose.model("User", userSchema);
