const express = require("express");
const routes = express();
const userController = require("../controllers/userController");
const { userValidator } = require("../middleware/validations");


routes.post("/create", userValidator.create, userController.create);
module.exports = routes;