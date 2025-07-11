import { useState } from "react";
import styles from "./CreateTweetStyles";

function CreateTweet({
  setTweets,
  currentUserId,
  users,
  getUsernameById,
  token,
}) {
  const [text, setText] = useState("");
  const username = getUsernameById(currentUserId, users);

  const handlePost = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/tweets/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: text }),
      });

      const newTweet = await response.json();

      newTweet.user = {
        _id: currentUserId,
        username,
      };

      setTweets((prevTweets) => [...prevTweets, newTweet]);
      setText("");
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div style={styles.container}>
      <textarea
        style={styles.textarea}
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        maxLength={280}
        aria-label="What's happening?"
      />
      <button
        style={styles.button}
        onClick={handlePost}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1A91DA")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
      >
        Post
      </button>
    </div>
  );
}

export default CreateTweet;
