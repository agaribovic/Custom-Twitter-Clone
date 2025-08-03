import { useEffect } from "react";
import { updateFollowers } from "../utils/updateFollowers";
import { deleteUser } from "../utils/deleteUser";
import { deleteTweetsByUser } from "../utils/deleteUser";
import styles from "./FollowersStyles.jsx";

export default function Followers({
  users,
  setUsers,
  currentUserId,
  setFollowingList,
  token,
  setTweets,
  tweets,
}) {
  const currentUser = users.find((user) => user._id === currentUserId);

  console.log("tweetovi", tweets);
  console.log("useri", users);

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

  return (
    <div style={styles.sidebar}>
      <h2
        style={{ marginBottom: "20px", fontSize: "18px", textAlign: "center" }}
      >
        Suggested Users
      </h2>
      {users.map((user) => {
        const isFollowing = currentUser?.following.includes(user._id);
        const isDisabled = currentUserId === user._id;

        const buttonStyle = {
          ...(isFollowing ? styles.unfollowButton : styles.followButton),
          ...(isDisabled ? styles.disabledButton : {}),
          width: 80,
        };

        return (
          <div key={user._id} style={styles.userCard}>
            <span
              onClick={() => handleDelete(user._id)}
              style={{
                pointerEvents: isDisabled ? "none" : "auto",
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              X
            </span>
            <span style={styles.username}>{user.username}</span>

            <button
              onClick={() => handleFollow(user._id)}
              disabled={isDisabled}
              style={buttonStyle}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
