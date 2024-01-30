const express = require("express");
const routes = express();
const messageController = require("../controllers/messageController");


routes.post("/send",messageController.sendMessages);
routes.get("/fetch/:chatId",messageController.fetchMessages);
module.exports = routes;