import axios from "axios";
import Swal from "sweetalert2";

export const deleteTweet = async ({ tweetId, token, onDelete }) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This tweet will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1DA1F2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/tweets/${tweetId}/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (onDelete) onDelete(tweetId);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your tweet has been deleted.",
        confirmButtonColor: "#1DA1F2",
      });
    } catch (err) {
      console.error("Error deleting tweet:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "You can delete only your own tweets.",
        confirmButtonColor: "#1DA1F2",
      });
    }
  }
};
