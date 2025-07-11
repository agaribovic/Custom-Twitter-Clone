import { useState, useEffect } from "react";
import styles from "./SortTweetsStyles";

const SortTweets = ({ tweets, sortBy, setSortBy, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sorted = [...tweets].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "likes") return b.likeCount - a.likeCount;
      if (sortBy === "az") return a.content.localeCompare(b.content);
      if (sortBy === "za") return b.content.localeCompare(a.content);
      return 0;
    });

    onSort(sorted);
  }, [tweets, sortBy, onSort]);

  const options = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "likes", label: "Most Likes" },
    { value: "az", label: "A → Z" },
    { value: "za", label: "Z → A" },
  ];

  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1A91DA")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1DA1F2")}
        style={styles.button}
      >
        Sort Tweets ▾
      </button>
      {isOpen && (
        <div style={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option.value}
              style={{
                ...styles.option,
                ...(sortBy === option.value ? styles.optionHover : {}),
              }}
              onClick={() => {
                setSortBy(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortTweets;
