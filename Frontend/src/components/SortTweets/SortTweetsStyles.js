const styles = {
  container: {
    position: "relative",
    display: "inline-block",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#1DA1F2",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  dropdown: {
    position: "absolute",
    top: "110%",
    left: 0,
    backgroundColor: "#fff",
    border: "1px solid #e1e8ed",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    zIndex: 10,
    width: "160px",
  },
  option: {
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#14171a",
  },
  optionHover: {
    backgroundColor: "#f5f8fa",
  },
};

export default styles;
