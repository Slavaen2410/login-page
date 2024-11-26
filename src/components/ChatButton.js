import React from "react";

function ChatButton({ toggleChat }) {
  return (
    <button style={styles.button} onClick={toggleChat}>
      Chat
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default ChatButton;
