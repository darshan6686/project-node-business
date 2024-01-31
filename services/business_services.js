const businessModel = require('../model/admin/business_model');

module.exports = class Business {
    findBusiness = async (body) => {
        return await businessModel.findOne(body)
    }

    findAllBusiness = async (body) => {
        return await businessModel.find(body)
    }

    createBusiness = async (body) => {
        return await businessModel.create(body);
    }

    updateBusiness = async (id, body) => {
        return await businessModel.updateOne({ _id : id }, {$set: body}, {new: true});
    }
}