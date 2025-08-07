import React, { useEffect } from "react";
import styles from "./FooterStyles";

const addKeyframes = () => {
  const styleId = "footer-slide-animation";
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    @keyframes slide {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-100%); }
    }
  `;
  document.head.appendChild(style);
};

const Footer = () => {
  useEffect(() => {
    addKeyframes();
  }, []);

  return (
    <footer style={styles.footerContainerStyle}>
      <div style={styles.slidingTextStyle}>
        Alen Garibović © 2025 · MERN stack · All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
