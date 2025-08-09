const styles = {
  sidebar: {
    width: "15%",
    minWidth: "210px",
    overflowY: "auto",
    backgroundColor: "#fff",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
    padding: "16px",
    borderRadius: "8px 0 0 8px",
    height: "1560px",
  },

  userCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    marginBottom: "12px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },

  username: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  },

  followButton: {
    backgroundColor: "#1da1f2",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "background-color 0.2s",
  },

  unfollowButton: {
    backgroundColor: "transparent",
    color: "#1da1f2",
    border: "1.5px solid #1da1f2",
    borderRadius: "9999px",
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "background-color 0.2s",
  },

  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

export default styles;
