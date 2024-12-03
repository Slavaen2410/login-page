import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Отправляем событие в GA при каждом изменении маршрута
    window.gtag("config", "G-GTZSJGSMZW", {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

function App() {
  const [isChatOpen, setChatOpen] = React.useState(false);

  const toggleChat = () => setChatOpen(!isChatOpen);

  return (
    <Router>
      <GoogleAnalytics />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ChatButton toggleChat={toggleChat} />
      {isChatOpen && <ChatWindow />}
    </Router>
  );
}

export default App;
