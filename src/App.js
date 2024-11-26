import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";
import ConnectionCounter from "./components/ConnectionCounter";

function App() {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => setChatOpen(!isChatOpen);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:userId" element={<div>Страница пользователя</div>} />
      </Routes>
      <ChatButton toggleChat={toggleChat} />
      {isChatOpen && <ChatWindow />}
      <ConnectionCounter />
    </Router>
  );
}

export default App;
