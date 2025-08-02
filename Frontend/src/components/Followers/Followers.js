import { useEffect } from "react";
import { updateFollowers } from "../utils/updateFollowers";
import styles from "./FollowersStyles.jsx";

export default function Followers({
  users,
  setUsers,
  currentUserId,
  setFollowingList,
}) {
  const currentUser = users.find((user) => user._id === currentUserId);

  useEffect(() => {
    if (currentUser && currentUser.following)
      setFollowingList(currentUser.following);
  }, [users]);

  const handleFollow = async (targetUserId) => {
    const updatedUsers = users.map((user) => {
      if (user._id !== currentUserId) return user;

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
    });
  };

  return (
    <aside style={styles.sidebar}>
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
        };

        return (
          <div key={user._id} style={styles.userCard}>
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
    </aside>
  );
}
