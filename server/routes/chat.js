const express = require("express");
const routes = express();
const chatController = require("../controllers/chatController");


routes.post("/accesschat", chatController.accessChat);
routes.get("/chats", chatController.fetchChats);
module.exports = routes;