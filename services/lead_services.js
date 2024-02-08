const leadModel = require('../model/admin/lead_model');

module.exports = class Lead {
    addLead = async (body) => {
        return await leadModel.create(body);
    }

    findLead = async (body) => {
        return await leadModel.findOne(body);
    }

    updateLead = async (id,body) => {
        return await leadModel.updateOne({askId: id}, {$set: body}, {new: true});
    }

    deleteLead = async (id,body) => {
        return await leadModel.updateOne({_id: id}, {$set: body}, {new: true});
    }
}