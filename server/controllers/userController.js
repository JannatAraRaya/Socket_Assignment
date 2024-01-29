const fs = require("fs");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const userService = require("../service/userService");


class User {
  async create(req,res) {
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
      const user = await userService.create(name,email,password)
      if (user) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully added the user",
          user
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "Failed to add the user!"
      );
    } catch (error) {
     console.log("User:",error)
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,"Internal Server Error..."
      );
    }
  }




}

module.exports = new User();