import { useState, useEffect } from "react";
import { updateFollowers } from "../utils/updateFollowers";
import { deleteUser } from "../utils/deleteUser";
import { deleteTweetsByUser } from "../utils/deleteUser";
import styles from "./FollowersStyles.jsx";
import shuffle from "lodash/shuffle";
import { motion, AnimatePresence } from "framer-motion";

export default function Followers({
  users,
  setUsers,
  currentUserId,
  setFollowingList,
  token,
  setTweets,
  isAdmin,
  currentUser
}) {
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (currentUser && currentUser.following)
      setFollowingList(currentUser.following);
  }, [users, currentUser, setFollowingList]);

  const handleFollow = async (targetUserId) => {
    const updatedUsers = users.map((user) => {
      const isFollowing = user.following.includes(targetUserId);

      const updatedFollowing = isFollowing
        ? user.following.filter((id) => id !== targetUserId)
        : [...user.following, targetUserId];

      return { ...user, following: updatedFollowing };
    });

    setUsers(updatedUsers);

    const updatedCurrentUser = updatedUsers.find(
      (user) => user._id === currentUserId
    );

    await updateFollowers({
      currentUserId,
      currentUser: updatedCurrentUser,
      setFollowingList,
      token,
    });
  };

  const handleDelete = async (targetUserId) => {
    const updateDeletedUsers = () => {
      const deletedUsers = users.filter(
        (user) => user && user._id !== targetUserId
      );
      setUsers(deletedUsers);
      setTweets((prevTweets) =>
        prevTweets.filter((tweet) => tweet.user?._id !== targetUserId)
      );
    };

    await deleteUser({
      targetUserId,
      token,
      updateDeletedUsers,
    });

    await deleteTweetsByUser({
      targetUserId,
      token,
    });
  };

  const handleShuffle = () => {
    setUsers((prev) => shuffle(prev));
  };

  return (
    <div style={styles.sidebar}>
      <h2
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          textAlign: "center",
          color: hovered ? "rgb(29, 161, 242)" : "black",
        }}
        onClick={handleShuffle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Suggested Users
      </h2>
      <AnimatePresence>
        {users.map((user, index) => {
          const isFollowing = currentUser?.following.includes(user._id);
          const isDisabled = currentUserId === user._id;

          const buttonStyle = {
            ...(isFollowing ? styles.unfollowButton : styles.followButton),
            ...(isDisabled ? styles.disabledButton : {}),
            width: 80,
          };

          return (
            <motion.li
              key={user._id}
              style={styles.userCard}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 25 }}
            >
              {
                <span
                  onClick={() => handleDelete(user._id)}
                  style={{
                    pointerEvents: !isAdmin || isDisabled ? "none" : "auto",
                    opacity: !isAdmin || isDisabled ? 0.5 : 1,
                    cursor: !isAdmin || isDisabled ? "not-allowed" : "pointer",
                    color: "#d33",
                  }}
                >
                  X
                </span>
              }
              <span
                style={{
                  ...styles.username,
                  color: user.username === "Admin" ? "blue" : "black",
                }}
              >
                {user.username}
              </span>

              <button
                onClick={() => handleFollow(user._id)}
                disabled={isDisabled}
                style={buttonStyle}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
