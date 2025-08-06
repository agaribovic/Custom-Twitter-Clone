const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Message = require("./models/Message");
const User = require("./models/User");

dotenv.config();
const app = express();
const server = http.createServer(app);

// Connect to DB
connectDB();

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tweets", require("./routes/tweetRoutes"));
app.use("/api/chatMessages", require("./routes/chatRoutes"));

// Socket handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("requestMessages", async () => {
    try {
      const messages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(50)
        .populate("sender", "username");

      socket.emit("messages", messages.reverse());
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  });

  socket.on("chatMessage", async ({ userId, content }) => {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      const message = new Message({ sender: user._id, content });
      await message.save();
      const populated = await message.populate("sender", "username");

      io.emit("chatMessage", {
        _id: populated._id,
        content: populated.content,
        username: populated.sender.username,
        createdAt: populated.createdAt,
      });
    } catch (err) {
      console.error("Error saving message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
