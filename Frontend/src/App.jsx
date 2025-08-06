import { useState } from "react";
import TweetList from "./components/TweetList/TweetList";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Followers from "./components/Followers/Followers";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import styles from "./AppStyles";
import { jwtDecode } from "jwt-decode";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);
  const [users, setUsers] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [tweets, setTweets] = useState([]);

  const decoded = token ? jwtDecode(token) : null;
  const currentUserId = decoded?.id;

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
          <button
            onClick={handleLogout}
            style={styles.logout}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1A91DA")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
          >
            Logout
          </button>

         

          <div style={{ display: "flex", alignItems: "flex-start" }}>
             
            <TweetList
              token={token}
              setUsers={setUsers}
              users={users}
              currentUserId={currentUserId}
              followingList={followingList}
              setFollowingList={setFollowingList}
              tweets={tweets}
              setTweets={setTweets}
              style={{ flex: 1 }}
            />

            <ChatMessages token={token}/>
            
              <Followers
                users={users}
                setUsers={setUsers}
                currentUserId={currentUserId}
                setFollowingList={setFollowingList}
                followingList={followingList}
                token={token}
                setTweets={setTweets}
                tweets={tweets}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              />
         
          </div>
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
