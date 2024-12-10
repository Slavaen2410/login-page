import React from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams(); // Получаем параметр userId из URL

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <h1 style={styles.username}>Профиль пользователя: {userId}</h1>
        </div>
        <div style={styles.profileInfo}>
          <p style={styles.infoText}>
            Здесь будет информация о пользователе: биография, активности, и т.д.
          </p>
        </div>
        <div style={styles.buttons}>
          <button style={styles.editButton}>Редактировать профиль</button>
          <button style={styles.logoutButton}>Выйти</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "700px",
    margin: "auto",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    textAlign: "center",
    marginBottom: "25px",
  },
  username: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
  },
  profileInfo: {
    marginBottom: "35px",
  },
  infoText: {
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "50px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "50px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  },
};

export default ProfilePage;
