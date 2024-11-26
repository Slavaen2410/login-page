import React, { useState, useEffect } from "react";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Подключаемся к WebSocket серверу
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("WebSocket подключен");
    };

    socket.onmessage = (event) => {
      console.log("Получено сообщение:", event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: event.data, sender: "bot" },
      ]);
    };

    socket.onclose = () => {
      console.log("WebSocket закрыт");
    };

    setWs(socket);

    // Очищаем WebSocket соединение при размонтировании компонента
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // Отправляем сообщение пользователем на сервер
      if (ws) {
        ws.send(input);
      }

      // Добавляем сообщение в чат как от пользователя
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Подождите", sender: "bot" },
      ]);
      setInput(""); // Очищаем поле ввода
    }
  };

  return (
    <div style={styles.chatWindow}>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#007bff" : "#eaeaea",
              color: msg.sender === "user" ? "#fff" : "#333",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <button style={styles.sendButton} onClick={sendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatWindow: {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    width: "300px",
    height: "400px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "70%",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ChatWindow;
