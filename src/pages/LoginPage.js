import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      setMessage(response.data.message); // Успешный ответ
    } catch (error) {
      // Проверка наличия error.response
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message); // Сообщение от сервера
      } else {
        setMessage("Ошибка сети. Проверьте подключение к серверу."); // Проблема с сетью
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>
        Войти
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  input: { marginBottom: "10px", padding: "10px", width: "100%" },
  button: { padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none" },
};

export default LoginPage;
