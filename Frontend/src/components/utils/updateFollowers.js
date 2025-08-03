import axios from "axios";

export const updateFollowers = async ({
  currentUserId,
  currentUser,
  setFollowingList,
  token,
}) => {
  try {
    const response = await axios.patch(
      "http://localhost:5000/api/users/follow",
      {
        _id: currentUserId,
        following: currentUser?.following || [],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = response.data;
    setFollowingList(data.following || []);
  } catch (error) {
    console.error("Error syncing follow state:", error);
  }
};
