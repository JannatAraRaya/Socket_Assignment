const UsersModel = require("../models/user");


class UserService {
    async create(name, email, password) {
        const emailCheck = await UsersModel.findOne({ email: email });
        if (emailCheck) {
            return sendResponse(
                res,
                HTTP_STATUS.UNPROCESSABLE_ENTITY,
                "This email already exists, Please try another mail."
            );
        }
        const user = await UsersModel.create({
            name: name,
            email: email,
            password: password
        });
        return user;
    }
}






module.exports = new UserService();