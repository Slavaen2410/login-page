const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const userRoutes = require("./routes/userRoutes");

// Импорт модели пользователя
const User = require("./models/User");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/users", userRoutes);

// Подключение к MongoDB
const MONGO_URI = "mongodb+srv://slavaen2410:kisusha2410@login-page.llwgi.mongodb.net/login_page_db?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Подключено к MongoDB"))
  .catch((error) => console.error("Ошибка подключения к MongoDB:", error));

// Регистрация
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(`Получены данные: email - ${email}, password - ${password}`);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const passwordRegex = /^(?=.*\d)(?!.*[^\w\d\s]).+$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Пароль должен содержать хотя бы одну цифру и не должен включать специальные символы.",
      });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    console.log("Пользователь успешно зарегистрирован:", newUser);
    res.status(200).json({ message: "Регистрация успешна" });
  } catch (error) {
    console.error("Ошибка регистрации пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Логин
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(`Попытка входа: email - ${email}, password - ${password}`);

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }

    console.log(`Пользователь ${email} вошел в систему`);
    res.status(200).json({ message: "Вход выполнен успешно" });
  } catch (error) {
    console.error("Ошибка входа пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
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
      client.send(
        JSON.stringify({ type: "connectionCount", count: activeConnections })
      );
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
