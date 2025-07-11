import styles from "./SearchTweetsStyles";

const SearchTweets = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search tweets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        styles={styles}
      />
    </div>
  );
};

export default SearchTweets;
