import axios from "axios";

export const fetchChatMessages = async (token) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/chatMessages/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postChatMessage = async (token, content) => {
  await axios.post(
    `${process.env.REACT_APP_API}/chatMessages/post`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
