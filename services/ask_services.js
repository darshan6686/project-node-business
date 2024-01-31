const askModel = require('../model/user/ask_model');
const userModel = require('../model/user_model');
const buinessModel = require('../model/admin/business_model');
const leadModel = require('../model/admin/lead_model');

module.exports = class Ask {
    findUser = async (body) => {
        return await userModel.findById(body);
    }

    addAsk = async (body) => {
        return await askModel.create(body);
    }

    findAllAsk = async (body) => {
        return await askModel.find(body);
    }

    findAsk = async (body) => {
        return await askModel.findOne(body);
    }

    updateAsk = async (id,body) => {
        return await askModel.updateOne({_id: id}, {$set: body}, {new: true});
    }

    findBusiness = async (body) => {
        return await buinessModel.findOne(body);
    }
}