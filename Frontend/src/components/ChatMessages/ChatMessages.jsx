import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { fetchChatMessages, postChatMessage } from "../utils/chatMessages"; // Moved to API layer
import styles from "./ChatMessagesStyles";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

const ChatPage = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const uniqueUsers = [...new Set(messages.map((msg) => msg.sender?._id))];
  const userColors = {};

  uniqueUsers.forEach((userId, index) => {
    const hue = (index * 137) % 360;
    userColors[userId] = `hsl(${hue}, 70%, 60%)`;
  });

  useEffect(() => {
    if (!token) return;

    // Auth for socket
    socket.auth = { token };
    socket.connect();

    // Handle incoming messages
    socket.on("chatMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      scrollToBottom();
    });

    // Initial fetch from REST API
    fetchChatMessages(token)
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Failed to fetch messages", err));

    // Cleanup
    return () => {
      socket.off("chatMessage");
      socket.disconnect();
    };
  }, [token, input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await postChatMessage(token, input);
      setInput("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Live Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => {
          return (
            <div key={msg._id} style={styles.message}>
              <strong style={{ color: userColors[msg.sender?._id] }}>
                <span>{msg.sender?.username || "Unknown"}</span>:
              </strong>{" "}
              {msg.content}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
