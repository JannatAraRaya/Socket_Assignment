const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password:{
        type:String,
        require:true,
    },
    is_online:{
        type:String,
    }
  },
  { timestamp: true }
);
const User = mongoose.model("users", userSchema);
module.exports = User;