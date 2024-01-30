const UsersModel = require("../models/userModel");


class UserService {
    async create(name, email, password) {
        const emailCheck = await UsersModel.findOne({ email: email });
        if (emailCheck) {
            console.log("This email already exists, Please try another mail.")

        }
        const user = await UsersModel.create({
            name: name,
            email: email,
            password: password
        });
        return user;
    }

    async login(email, password) {
        const user = await UsersModel.findOne({ email: email });

        const passwordMatch = await bcrypt.compare(password, user.password);
        return passwordMatch;
    }
}






module.exports = new UserService();