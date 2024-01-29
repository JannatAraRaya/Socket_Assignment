const fs = require("fs");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");
const MessageModel = require("../models/messageModel")
const jsonwebtoken = require("jsonwebtoken");
class Message {
    async sendMessages(req, res) {
        try {
            const { content, chatId } = req.body;
            const jwtToken = req.headers.authorization.split(" ")[1];
            const decodedToken = jsonwebtoken.decode(jwtToken);
            const decodedId = decodedToken.id;

            let newMessage = await MessageModel.create({
                sender: decodedId,
                content,
                chat: chatId
            });

            // console.log(newMessage);

            newMessage = await MessageModel.populate(newMessage, [
                { path: "sender", select: "name email" },
                { path: "chat", populate: { path: "users", select: "name email" } }
            ]);

            await ChatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage });

            return sendResponse(
                res,
                HTTP_STATUS.OK, "Messages.", newMessage
            );
        } catch (error) {
            console.log("Error:", error);
            return sendResponse(
                res,
                HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error..."
            );
        }
    }

    async fetchMessages(req, res) {
        try {
            // const { chatId } = req.body;
            // console.log(chatId)
            const chatId ='65b7324df125cc2f722cd65e'
            const messages = await MessageModel.find({ chat: chatId })
                .populate("sender", "name email")
                .populate("chat");
            // console.log("Messages", messages)
            return sendResponse(
                res,
                HTTP_STATUS.OK, " All Messages.", messages
            );
        } catch (error) {
            console.log("Error:", error);
            return sendResponse(
                res,
                HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error..."
            );
        }
    }
}





module.exports = new Message();