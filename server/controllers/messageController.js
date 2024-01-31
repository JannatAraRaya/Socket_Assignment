const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const ChatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel")
const jsonwebtoken = require("jsonwebtoken");
class Message {
    async sendMessages(req, res) {
        try {
            const { content, chatId ,sender} = req.body;
            // const jwtToken = req.headers.authorization.split(" ")[1];
            // const decodedToken = jsonwebtoken.decode(jwtToken);
            // const decodedId = decodedToken.id;

            let newMessage = await MessageModel.create({
                // sender: decodedId,
                sender:sender,
                content,
                chat: chatId
            });

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
            const { chatId } = req.params; 
            const messages = await MessageModel.find({ chat: chatId })
                .populate("sender", "name email")
                .populate("chat");
    
            return sendResponse(
                res,
                HTTP_STATUS.OK, " All Messages.",
                messages.map(message => ({
                    sender: {
                        id: message.sender._id,
                        name: message.sender.name,
                        email: message.sender.email
                    },
                    content: message.content,
                    chat: message.chat
                }))
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