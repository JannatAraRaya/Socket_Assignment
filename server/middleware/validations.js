const { body } = require("express-validator");

const userValidator = {
    create: [
      body("name")
        .exists()
        .withMessage("Name is not provided.")
        .trim()
        .isString()
        .withMessage("Name must be a string")
        .isLength({ max: 30 })
        .withMessage("Name must not exceed 30 characters")
        .notEmpty()
        .withMessage("Name is required"),
  
      body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email address")
        .notEmpty()
        .withMessage("Email is required"),
        body("password")
        .exists()
        .withMessage("Password must be provided")
        .bail()
        .isString()
        .withMessage("Password must be a String")
        .bail()
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
          minNumbers: 1,
        })
        .withMessage(
          "Password should be at least 8 characters, with a minimum of 1 lowercase, 1 uppercase, 1 number, and 1 symbol."
        ),
    ]
    

  };
  module.exports = {userValidator};