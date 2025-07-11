const styles = {
  container: {
    maxWidth: "600px",
    margin: "1rem auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  textarea: {
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "16px",
    border: "1px solid #ccd6dd",
    resize: "none",
    outline: "none",
    boxShadow: "0 0 4px rgba(0, 0, 0, 0.05)",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
  },
  button: {
    alignSelf: "flex-end",
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#1da1f2",
    color: "#fff",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};

export default styles;
