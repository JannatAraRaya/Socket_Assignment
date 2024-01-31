const { Server } = require("socket.io");
const dotenv = require("dotenv").config();

module.exports = (server) => {
  const io = new Server(server, {
    pingTimeout: 90000,
    cors: {
      origin: process.env.FRONTEND_URL,
      method: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};
