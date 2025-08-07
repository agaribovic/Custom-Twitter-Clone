const styles = {
  bulbWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    width: "300px",
    cursor: "pointer",
  },

  bulb: {
    position: "relative",
    width: "60px",
    height: "70px",
    backgroundColor: "#333",
    borderRadius: "50% 50% 40% 40%",
    transition: "background 0.3s ease",
  },

  bulbLight: {
    backgroundColor: "#ffe066",
    boxShadow: "0 0 30px 10px #ffec99",
  },

  bulbDark: {
    backgroundColor: "#333",
    boxShadow: "none",
  },

  bulbTop: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "20px",
    height: "20px",
    backgroundColor: "#666",
    borderRadius: "50%",
  },

  bulbBase: {
    position: "absolute",
    bottom: "-18px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "30px",
    height: "20px",
    backgroundColor: "#444",
    borderRadius: "4px",
  },

  bulbGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100px",
    height: "100px",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: "radial-gradient(circle, #fff3bf 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.4s ease",
    zIndex: -1,
  },

  bulbGlowVisible: {
    opacity: 1,
  },
};

export default styles;
