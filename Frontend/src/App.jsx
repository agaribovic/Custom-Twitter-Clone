import { useState, useEffect } from "react";
import TweetList from "./components/TweetList/TweetList";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Followers from "./components/Followers/Followers";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Footer from "./components/Footer/Footer";
import BackgroundMusic from "./components/BackgroundMusic/BackgroundMusic";
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
  const isAdmin = currentUser?.username === "Admin".toLowerCase();

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
    <>
      {token ? (
        <>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              whiteSpace: "nowrap",
              minWidth: "1030px",
            }}
          >
            <button
              onClick={handleLogout}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1A91DA")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
              className="btnLogout"
            >
              Logout
            </button>

            <BackgroundMusic />
            <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          </header>

          <div
            id="container"
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
                  className="btnLogin"
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
                  className="btnLogin"
                >
                  Register
                </button>
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
