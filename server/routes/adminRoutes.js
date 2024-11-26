const express = require("express");
const router = express.Router();
const adminAuthMiddleware = require("../utils/adminAuth");

router.get("/", adminAuthMiddleware, (req, res) => {
  res.send("<h1>Панель администратора</h1>");
});

module.exports = router;
