const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

let users = []; // Локальное хранилище пользователей

// Регистрация
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log(`Получены данные: email - ${email}, password - ${password}`);

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "Пользователь уже существует" });
  }

  const passwordRegex = /^(?=.*\d)(?!.*[^\w\d\s]).+$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Пароль должен содержать хотя бы одну цифру и не должен включать специальные символы.",
    });
  }

  users.push({ email, password });
  console.log("Пользователи после регистрации:", users);

  res.status(200).json({ message: "Регистрация успешна" });
});

// Логин
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`Попытка входа: email - ${email}, password - ${password}`);

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(400).json({ message: "Неверный email или пароль" });
  }

  console.log(`Пользователь ${email} вошел в систему`);
  res.status(200).json({ message: "Вход выполнен успешно" });
});

// WebSocket сервер
const wss = new WebSocket.Server({ noServer: true });
let activeConnections = 0;

wss.on("connection", (ws) => {
  activeConnections++;
  console.log(`Новое соединение. Активных соединений: ${activeConnections}`);

  broadcastActiveConnections();

  ws.on("close", () => {
    activeConnections--;
    console.log(`Соединение закрыто. Активных соединений: ${activeConnections}`);
    broadcastActiveConnections();
  });
});

function broadcastActiveConnections() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "connectionCount", count: activeConnections }));
    }
  });
}

// Запуск HTTP сервера
const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

// Прокси для WebSocket соединений
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
