import React from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams(); // Получаем параметр userId из URL

  return (
    <div style={styles.container}>
      <h1>Профиль пользователя</h1>
      <p>ID пользователя: {userId}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
};

export default ProfilePage;
