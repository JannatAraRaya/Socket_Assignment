const fs = require("fs");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const ChatService  = require("../service/chatService");
class Chat {
    async accessChat(req, res) {
        try {
            const { userId } = req.body;
            const jwtToken = req.headers.authorization.split(" ")[1];
            const AllChat = await ChatService.accessChat(userId,jwtToken )
            return sendResponse(
                res,
                HTTP_STATUS.OK, "Full Chat...", AllChat
            );
        } catch (error) {
            console.log("Error:", error);
            return sendResponse(
                res,
                HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error..."
            );
        }
    }
    async fetchChats(req, res) {
        try {
            const jwtToken = req.headers.authorization.split(" ")[1];
            const results = await ChatService.fetchChats(jwtToken);

            return sendResponse(
                res,
                HTTP_STATUS.OK, "Successfully Fetched", results
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





module.exports = new Chat();