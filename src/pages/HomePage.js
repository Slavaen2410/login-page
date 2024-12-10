import React from "react";

function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Публикации</h1>
      <p style={styles.subHeader}>Найдите публикации по интересующим вас темам и тегам</p>

      <div style={styles.postsContainer}>
        <div style={styles.postCard}>
          <h3 style={styles.postTitle}>Заголовок публикации</h3>
          <p style={styles.postContent}>
            Это пример текста публикации. Здесь можно добавить что-то интересное или важное!
          </p>
          <div style={styles.tags}>
            <span style={styles.tag}>#тег1</span>
            <span style={styles.tag}>#тег2</span>
          </div>
        </div>

        <div style={styles.postCard}>
          <h3 style={styles.postTitle}>Заголовок публикации 2</h3>
          <p style={styles.postContent}>
            Это второй пример текста публикации. Здесь тоже можно выразить свои мысли.
          </p>
          <div style={styles.tags}>
            <span style={styles.tag}>#тег3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  subHeader: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "10px",
    marginBottom: "40px",
  },
  postsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    justifyItems: "center",
    paddingBottom: "20px",
  },
  postCard: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    cursor: "pointer",
  },
  postCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
  },
  postTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  postContent: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "15px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "15px",
  },
  tag: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "30px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default HomePage;
