const express = require("express");
const router = express.Router();

let users = []; // Храним пользователей в памяти

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.send({ message: "Пользователь зарегистрирован!" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.send({ message: "Вход успешен!" });
  } else {
    res.status(401).send({ message: "Неверные данные!" });
  }
});

module.exports = router;
