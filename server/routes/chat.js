const express = require("express");
const routes = express();
const chatController = require("../controllers/chatController");


routes.post("/chat", chatController.saveChats);
module.exports = routes;