const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
    },
    text:{
        type:String,
        require:true
    }
  },
  { timestamp: true }
);
const Chat= mongoose.model("chats",chatSchema);
module.exports = Chat;