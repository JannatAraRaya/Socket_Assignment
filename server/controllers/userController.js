const fs = require("fs");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../utils/handleResponse");
const HTTP_STATUS = require("../constants/http_codes");
const HTTP_MESSAGE = require("../constants/http_messgaes");
const userService = require("../service/userService");


class User {
  async create(req,res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          HTTP_MESSAGE.FAILED_DEPENDENCY,
          validation
        );
      }
      const { name, email, password } = req.body;     
      const user = await userService.create(name,email,password)
      if (user) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          HTTP_MESSAGE.ACCEPTED,
          user
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        HTTP_MESSAGE.FAILED_DEPENDENCY
      );
    } catch (error) {
     console.log("User:",error)
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        HTTP_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }




}

module.exports = new User();