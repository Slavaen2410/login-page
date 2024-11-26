module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("New client connected");
  
      socket.on("chatMessage", (message) => {
        console.log("Message received:", message);
        socket.emit("chatResponse", "Подождите");
      });
  
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  };
  