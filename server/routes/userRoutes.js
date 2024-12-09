const express = require("express");
const User = require("../models/User"); // Импорт модели пользователя
const router = express.Router();

// Получение всех пользователей
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Обновление пользователя
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json({ message: "Пользователь обновлен", user });
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Удаление пользователя
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json({ message: "Пользователь удален" });
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
