import styles from "./ThemeToggleStyles";

const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <div style={styles.bulbWrapper} onClick={toggleTheme}>
      <div
        style={{
          ...styles.bulb,
          ...(theme === "light" ? styles.bulbLight : styles.bulbDark),
        }}
      >
        <div style={styles.bulbTop} />
        <div style={styles.bulbBase} />
        <div style={styles.bulbGlow} />
      </div>
    </div>
  );
};

export default ThemeToggle;
