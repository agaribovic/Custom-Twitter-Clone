import axios from "axios";

export const updateTweet = async ({ tweetId, content, token }) => {
  try {
    const res = await axios.patch(
      `http://localhost:5000/api/tweets/${tweetId}/edit`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating tweet:", error);
    throw error;
  }
};
