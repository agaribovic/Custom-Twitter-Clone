import axios from "axios";

export const toggleLike = async ({
  tweetId,
  action,
  token,
  setLiked,
  setLikeCount,
  setLoading,
  loading,
}) => {
  if (loading) return;
  setLoading(true);
  try {
    const res = await axios.post(
      `http://localhost:5000/api/tweets/${tweetId}/${action}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLiked(action === "like");
    setLikeCount(res.data.likes);
  } catch (err) {
    console.error(
      `Error ${action === "like" ? "liking" : "unliking"} tweet:`,
      err.message
    );
  } finally {
    setLoading(false);
  }
};
