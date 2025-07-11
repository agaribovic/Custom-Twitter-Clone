import { useState } from "react";
import styles from "./EditTweetStyles";

const EditTweet = ({ tweet, isOpen, onClose, onUpdate, disabledEdit }) => {
  const [newContent, setNewContent] = useState(tweet.content || "");
  const [saveHover, setSaveHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  const handleSave = () => {
    onUpdate(tweet._id, newContent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Edit Tweet</h2>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows="4"
          style={styles.textarea}
        />
        <div style={styles.buttons}>
          <button
            onClick={handleSave}
            style={{
              ...styles.saveBtn,
              ...(disabledEdit ? styles.saveBtnDisabled : {}),
              ...(saveHover ? styles.saveBtnHover : {}),
            }}
            onMouseEnter={() => setSaveHover(true)}
            onMouseLeave={() => setSaveHover(false)}
            disabled={disabledEdit}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              ...styles.cancelBtn,
              ...(cancelHover ? styles.cancelBtnHover : {}),
            }}
            onMouseEnter={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTweet;
