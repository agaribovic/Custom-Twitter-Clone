import { useState } from "react";
import TweetList from "./components/TweetList/TweetList";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import styles from "./AppStyles";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const handleRegisterSuccess = (userData) => {
    if (userData.token) {
      handleLogin(userData.token);
    } else {
      setShowRegister(false);
      alert("Registration successful! Please log in.");
    }
  };

  return (
    <div>
      {token ? (
        <>
          <button
            onClick={handleLogout}
            style={styles.logout}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1A91DA")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
          >
            Logout
          </button>

          <TweetList token={token} />
        </>
      ) : (
        <>
          {showRegister ? (
            <>
              <Registration onRegisterSuccess={handleRegisterSuccess} />
              <p style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <button
                  onClick={() => setShowRegister(false)}
                  style={styles.login}
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <p style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <button
                  onClick={() => setShowRegister(true)}
                  style={styles.login}
                >
                  Register
                </button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
