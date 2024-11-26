import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const sendMessage = (message) => {
  socket.emit("chatMessage", message);
};

socket.on("chatResponse", (response) => {
  console.log("Ответ чата:", response);
});

export default socket;
