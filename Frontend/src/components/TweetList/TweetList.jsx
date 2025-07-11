import { useMemo, useCallback, useEffect, useState } from "react";

import CreateTweet from "../CreateTweet/CreateTweet";
import SortTweets from "../SortTweets/SortTweets";
import SearchTweets from "../SearchTweets/SearchTweets";
import TweetCard from "../TweetCard/TweetCard.jsx";
import styles from "./TweetListStyles.js";

import { jwtDecode } from "jwt-decode";

const TweetList = ({ token }) => {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sortedTweets, setSortedTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const decoded = token ? jwtDecode(token) : null;
  const currentUserId = decoded?.id;

  const tweetsPerPage = 5;

  const indexOfLastTweet = currentPage * tweetsPerPage;
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  const currentTweets = sortedTweets.slice(indexOfFirstTweet, indexOfLastTweet);

  const totalPages = Math.ceil(tweets.length / tweetsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tweetsRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/api/tweets/get"),
          fetch("http://localhost:5000/api/users/get"),
        ]);

        const tweetsData = await tweetsRes.json();
        const usersData = await usersRes.json();

        setTweets(tweetsData);
        setSortedTweets(tweetsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const getUsernameById = (id, usersArray) => {
    const user = usersArray.find((u) => u._id === id);
    return user?.username || "unknown";
  };

  const handleTweetDelete = (deletedId) => {
    setTweets(tweets.filter((tweet) => tweet._id !== deletedId));
  };

  const filteredTweets = useMemo(() => {
    return tweets.filter((tweet) => {
      const contentMatch = tweet.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const usernameMatch = tweet.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return contentMatch || usernameMatch;
    });
  }, [tweets, searchTerm]);

  const handleSort = useCallback((sorted) => {
    setSortedTweets(sorted);
  }, []);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleTweetUpdate = (updatedTweet) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet._id === updatedTweet._id ? updatedTweet : tweet
      )
    );
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
          alt="Twitter Logo"
          width="100"
          height="100"
        />
        <h3>Welcome, {getUsernameById(currentUserId, users)}!</h3>
      </div>
      <CreateTweet
        setTweets={setTweets}
        getUsernameById={(id, users) => getUsernameById(id, users)}
        currentUserId={currentUserId}
        users={users}
        token={token}
      />

      <div style={styles.div}>
        <SearchTweets searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortTweets
          tweets={filteredTweets}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSort={handleSort}
        />
      </div>

      {currentTweets.map((tweet) => (
        <TweetCard
          key={tweet._id}
          tweet={tweet}
          token={token}
          currentUserId={currentUserId}
          onDelete={handleTweetDelete}
          onUpdate={handleTweetUpdate}
          users={users}
          getUsernameById={(id, users) => getUsernameById(id, users)}
        />
      ))}
      <div style={styles.pagination}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{
            ...styles.button,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>
        <span style={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{
            ...styles.button,
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TweetList;
