import React, { useEffect, useState } from "react";

function ConnectionCounter() {
  const [connectionCount, setConnectionCount] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connectionCount") {
        setConnectionCount(data.count);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={styles.counter}>
      Активных соединений: {connectionCount}
    </div>
  );
}

const styles = {
  counter: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default ConnectionCounter;
