const fs = require("fs");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const userService = require("../service/userService");
const userModel = require("../models/userModel");
const generateToken =require( "../config/generateToken");

class User {
  async create(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the user!",
          validation
        );
      }
      const { name, email, password } = req.body;
      const user = await userService.create(name, email, password)
        const token = generateToken(user._id);

      if (user) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully added the user",
          token
      
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "Failed to add the user!"
      );
    } catch (error) {
      console.log("User:", error)
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error..."
      );
    }
  }
  async login(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the user!",
          validation
        );
      }
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      console.log(user)
      if (user) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "User Found",
          user
        );
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      console.log(passwordMatch);
      if (passwordMatch) {
        return sendResponse(res, HTTP_STATUS.OK, "Successfully Logged in!");
      } else {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to Login!"
        );
      }

    } catch (error) {
      console.log("User:", error)
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error..."
      );
    }
  }
}

module.exports = new User();