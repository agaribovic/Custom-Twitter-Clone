const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("sender", "username");
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const postMessage = async (req, res) => {
  const userId = req.user.id;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Message content required" });
  }

  try {
    const message = new Message({ sender: userId, content });
    await message.save();

    // Populate sender username for emitting
    const populated = await message.populate("sender", "username");

    // Emit new message event to all connected socket clients
    req.io.emit("chatMessage", {
      _id: populated._id,
      username: populated.sender.username,
      content: populated.content,
      createdAt: populated.createdAt,
    });

    res.status(201).json(populated);
  } catch (err) {
    console.error("Error posting message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
};

module.exports = { getMessages, postMessage };
