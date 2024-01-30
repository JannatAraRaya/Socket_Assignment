const dotenv = require("dotenv").config();
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { sendResponse } = require("./utils/handleResponse");
const HTTP_STATUS = require("./constants/http_codes");

// Database connection
const databaseConnection = require("./config/database");

// Express Modules
const express = require("express");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000, //After 60 seconds its going to close the connection
  cors: {
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
    credentials: true
  }
});
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Exporting all the routes
const usersRouter = require("./routes/user");
const chatsRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

// Main routers
app.use("/user", usersRouter);
app.use("/chats", chatsRouter);
app.use("/messages", messageRouter);

// Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return sendResponse(res, HTTP_STATUS.BAD_REQUEST, "Invalid JSON Format!");
  }
  next();
});

app.use("*", (req, res) => {
  return sendResponse(
    res,
    HTTP_STATUS.NOT_FOUND,
    "Wrong URL, Please re-check your URL."
  );
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

// io.on("connection", (socket) => {
//   console.log("User Connected socket.io");
//   // socket.on("setup", (userData) => {
//   //   console.log(userData.id)
//   //   socket.join(userData.id);
//   //   socket.emit("connected");
//   // });
//   socket.on('setup', (userData) => {
//     socket.join(userData);
//     console.log('UserConnected: ' + userData);
//     socket.emit('connected');
//   });

//   socket.on('join chat', (room) => {
//     socket.join(room);
//     console.log('User joined room: ' + room);
//   });



//   socket.on("sendMessage", ({ userId, content }) => {
//     console.log(userId);
//     console.log(content)
//     io.to(userId).emit("receiveMessage", { sender: socket.id, content });
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

server.listen(3000, () => {
  console.log("Socket.IO server is running on port 3000");
});


databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
