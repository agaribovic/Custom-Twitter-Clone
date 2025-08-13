import { useState } from "react";
import { toggleLike } from "../API/toggleLike";
import { updateTweet } from "../API/updateTweet";
import { deleteTweet } from "../API/deleteTweet";
import EditTweet from "../EditTweet/EditTweet";
import styles from "../TweetCard/TweetCardStyles";

const TweetCard = ({
  tweet,
  token,
  currentUserId,
  onDelete,
  onUpdate,
  getUsernameById,
  users,
  isAdmin,
}) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(tweet.likes.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(tweet.likes.length);
  const [isEditing, setIsEditing] = useState(false);

  const username = getUsernameById(currentUserId, users);

  const handleLike = () =>
    toggleLike({
      tweetId: tweet._id,
      action: "like",
      token,
      setLiked,
      setLikeCount,
      setLoading,
      loading,
    });

  const handleUnlike = () =>
    toggleLike({
      tweetId: tweet._id,
      action: "unlike",
      token,
      setLiked,
      setLikeCount,
      setLoading,
      loading,
    });

  const handleDelete = () => {
    deleteTweet({
      tweetId: tweet._id,
      token,
      onDelete,
    });
  };

  const handleUpdate = async (tweetId, newContent) => {
    try {
      const updated = await updateTweet({
        tweetId,
        content: newContent,
        token,
      });
      onUpdate(updated.tweet);
    } catch (error) {
      console.error("Failed to update tweet:", error);
    }
  };

  return (
    <div style={styles.container}>
      <p style={{ fontWeight: "bold", fontSize: 18 }}>
        @{tweet.user?.username}
      </p>
      <p style={{ color: "#555" }}>{tweet.content}</p>

      <p style={{ margin: "4px 0", fontSize: "12px", color: "#657786" }}>
        <code style={{ fontFamily: "inherit", background: "none" }}>
          {new Date(tweet.createdAt).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </code>
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={liked ? handleUnlike : handleLike}
          disabled={loading}
          style={{
            ...styles.likeButton,
            color: liked ? "red" : "gray",
          }}
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>

        <EditTweet
          tweet={tweet}
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdate}
          disabledEdit={
            username !== tweet.user?.username && !isAdmin
          }
        />

        <div style={{ display: "flex" }}>
          <button
            onClick={() => setIsEditing(true)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i
              className="fas fa-edit"
              style={{ color: "#1d9bf0", fontSize: "18px" }}
            ></i>
          </button>

          <button
            onClick={handleDelete}
            style={styles.deleteButton}
            title="Delete tweet"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
