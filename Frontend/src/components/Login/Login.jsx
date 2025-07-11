import { useState } from "react";
import axios from "axios";
import styles from "./LoginStyles";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { token } = res.data;

      localStorage.setItem("token", token);

      if (onLogin) onLogin(token);
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formStyle}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.inputStyle}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading} style={styles.buttonStyle}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
