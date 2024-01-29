const fs = require("fs");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
class Chat {
    async accessChat(req, res) {

        try {
            const { userId } = req.body;
            const jwtToken = req.headers.authorization.split(" ")[1];
            const decodedToken = jsonwebtoken.decode(jwtToken);
            const decodedId = decodedToken.id;
            console.log(userId)
            console.log(decodedToken.id);
            let isChat = await ChatModel.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: decodedId } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ],
            }).populate("latestMessage").populate("users")

            isChat = await ChatModel.populate(isChat, {
                path: "latestMessage.sender",
                select: "name email",
            });

            console.log("isChat found:", isChat);

            if (isChat.length > 0) {
                return sendResponse(
                    res,
                    HTTP_STATUS.OK, "Initial Chat", isChat[0]
                );
            } else {
                var chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    users: [decodedId, userId],
                };
            }

            const createdChat = await ChatModel.create(chatData);
            console.log(createdChat);
            const AllChat = await ChatModel.findOne({ _id: createdChat._id }).populate("users")
            return sendResponse(
                res,
                HTTP_STATUS.OK, "Full Chat.", AllChat
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
            const decodedToken = jsonwebtoken.decode(jwtToken);
            const decodedId = decodedToken.id;
            ChatModel.find({ users: { $elemMatch: { $eq: decodedId} } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
              results = await UserModel.populate(results, {
                path: "latestMessage.sender",
                select: "name email",
              });
              console.log("result:",results)
              return sendResponse(
                res,
                HTTP_STATUS.OK, "Successfully Fetched",results 
            );
            });
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