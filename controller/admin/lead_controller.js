const lead_model = require('../../model/admin/lead_model');
const Lead = require('../../services/lead_services');
const leadService = new Lead();

exports.getAllLead = async (req,res) => {
    try {
        let lead = await lead_model.aggregate([
            {
                $match: {
                    "admin": req.admin._id,
                    "isDelete": false
                }
            },
            {   
                $lookup:{
                    from:"users",
                    localField:"user",
                    foreignField:"_id",
                    as:"userInfo"
                } 
            },
            {
                $unwind:"$userInfo"
            },
            {
                $project: {
                    "userInfo.middleName": 0,
                    "userInfo.email": 0,
                    "userInfo.password": 0,
                    "userInfo.gender": 0,
                    "userInfo.birthDate": 0,
                    "userInfo.mobileNumber": 0,
                    "userInfo.isAdmin": 0,
                    "userInfo.isDelete": 0,
                    "userInfo.__v": 0
                }
            }
        ])
        if(lead){
            res.json(lead)
        }
        else{
            res.json({message: "lead not found"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getLead = async (req,res) => {
    try {
        let isLead = await leadService.findLead({askId: req.body.askId, admin: req.admin._id, isDelete: false})
        if(!isLead){
            return res.status(401).json({ message : "Unauthorized access!" });
        }
   
        res.json(isLead)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}