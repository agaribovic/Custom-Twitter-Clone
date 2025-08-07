import { useState } from "react";
import axios from "axios";
import styles from "./RegistrationStyles";

const Registration = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/users/register`,
        {
          username,
          email,
          password,
        }
      );

      if (onRegisterSuccess) onRegisterSuccess(response.data);

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formStyle}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.inputStyle}
      />

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
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Registration;
