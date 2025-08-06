import axios from "axios";

export const fetchChatMessages = async (token) => {
  const res = await axios.get(`http://localhost:5000/api/chatMessages/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postChatMessage = async (token, content) => {
  await axios.post(
    `http://localhost:5000/api/chatMessages/post`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
