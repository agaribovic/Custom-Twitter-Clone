import { useState, useEffect } from "react";
import TweetList from "./components/TweetList/TweetList";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Followers from "./components/Followers/Followers";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Footer from "./components/Footer/Footer";
import styles from "./AppStyles";
import { jwtDecode } from "jwt-decode";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(defaultTheme);
    document.body.className = defaultTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const decoded = token ? jwtDecode(token) : null;
  const currentUserId = decoded?.id;
  const currentUser = users.find((user) => user._id === currentUserId);
  const isAdmin = currentUser?.username === "Admin";

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
    }
  };

  return (
    <div>
      {token ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleLogout}
              style={styles.logout}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1A91DA")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
            >
              Logout
            </button>

            <h1 style={{ marginLeft: "125px" }}>𝙲𝚄𝚂𝚃𝙾𝙼 𝚃𝚆𝙸𝚃𝚃𝙴𝚁 𝙲𝙻𝙾𝙽𝙴 𝙰𝙿𝙿</h1>

            <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "50px",
              justifyContent: "space-between",
            }}
          >
            <ChatMessages token={token} />

            <TweetList
              token={token}
              setUsers={setUsers}
              users={users}
              currentUserId={currentUserId}
              followingList={followingList}
              setFollowingList={setFollowingList}
              tweets={tweets}
              setTweets={setTweets}
              isAdmin={isAdmin}
              currentUser={currentUser}
              style={{ flex: 1 }}
            />

            <Followers
              users={users}
              setUsers={setUsers}
              currentUserId={currentUserId}
              setFollowingList={setFollowingList}
              followingList={followingList}
              token={token}
              setTweets={setTweets}
              tweets={tweets}
              isAdmin={isAdmin}
              currentUser={currentUser}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            />
          </div>
          <Footer />
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
