module.exports = (req, res, next) => {
  const { adminKey } = req.headers;
  if (adminKey === "my-secure-admin-key") {
    next(); // Если ключ верный, продолжаем выполнение
  } else {
    res.status(403).send({ message: "Доступ запрещён!" }); // Отправляем ошибку при неверном ключе
  }
};
