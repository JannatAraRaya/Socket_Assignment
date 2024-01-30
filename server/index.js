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

// Importing all the routes
const usersRouter = require("./routes/user");
const chatsRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const socketController = require("./controllers/socketController");


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


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

socketController(server);

databaseConnection(() => {
  server.listen(3000, () => {
    console.log("Socker.io server is running on port 3000");
  });
  
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
