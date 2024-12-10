import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.nav}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/profile/123" style={styles.link}>Profile</Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#333",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    borderBottom: "2px solid #444",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Header;
