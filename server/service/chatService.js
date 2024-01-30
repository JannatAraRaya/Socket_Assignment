const UserModel = require("../models/userModel")
const ChatModel = require("../models/chatModel");
const jsonwebtoken = require("jsonwebtoken");


class ChatService {
    async accessChat(userId,jwtToken ) {
        const decodedToken = jsonwebtoken.decode(jwtToken);
        const decodedId = decodedToken.id;

        const isChat = await ChatModel.findOne({
            isGroupChat: false,
            users: { $all: [decodedId, userId] },
        }).populate("latestMessage").populate("users");
        
        if (isChat) {
            return isChat;
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [decodedId, userId],
            };
        
            const createdChat = await ChatModel.create(chatData);
            const allChat = await ChatModel.findOne({ _id: createdChat._id }).populate("users");
            return allChat;
        }
        
    }
    async fetchChats(jwtToken){
        const decodedToken = jsonwebtoken.decode(jwtToken);
        const decodedId = decodedToken.id;
          
        const results = await ChatModel.find({ users: { $elemMatch: { $eq: decodedId } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

    const populatedResults = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email",
    });

    return populatedResults;
    }
}

module.exports = new ChatService();