const fs = require("fs");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const HTTP_MESSAGE = require("../constants/http_messgaes");
const ChatModel = require("../models/chat");

class Chat {
    async saveChats(req, res) {
        try {
            const { sender, receiver, text } = req.body;
            let chat = await ChatModel.create({
                sender: sender,
                receiver: receiver,
                text: text
            })
            await chat.save();
            console.log(chat);

           return sendResponse(res, HTTP_STATUS.OK, HTTP_MESSAGE.SUCCESS, chat);
        } catch (error) {
            console.log(error);
            return sendResponse(
                res,
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                HTTP_MESSAGE.INTERNAL_SERVER_ERROR
            );
        }
    }

}

module.exports = new Chat();