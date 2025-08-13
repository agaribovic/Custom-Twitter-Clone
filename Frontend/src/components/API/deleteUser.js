import axios from "axios";
import Swal from "sweetalert2";

export const deleteUser = async ({
  targetUserId,
  token,
  updateDeletedUsers,
}) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This user will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1DA1F2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/users/${targetUserId}/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      updateDeletedUsers();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your user has been deleted.",
        confirmButtonColor: "#1DA1F2",
      });
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }
};

export const deleteTweetsByUser = async ({ targetUserId, token }) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/users/userTweets/${targetUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete tweets");
  }
};
