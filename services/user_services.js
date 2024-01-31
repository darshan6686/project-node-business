const userModel = require('../model/user_model');

module.exports = class UserService{
    findUser = async (body) => {
        return await userModel.findOne(body);
    }

    createUser = async (body) => {
        return await userModel.create(body);
    }

    updateUser = async (id,body) => {
        return await userModel.findByIdAndUpdate(id, {$set: body}, {new: true});
    }
}