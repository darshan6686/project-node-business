const Ask = require('../../services/ask_services');
const Lead = require('../../services/lead_services');
const askModel = require('../../model/user/ask_model')
const dealModel = require('../../model/user/deal_model')
const askService = new Ask();
const leadService = new Lead();

exports.addAsk = async (req,res) => {
    try {
        const isUser = await askService.findUser(req.user._id);
        if(!isUser){
            return res.json({message: "You can not ask"});
        }

        let isBusiness = await askService.findBusiness({admin: req.body.adminId, categery: req.body.categery, isDelete: false});
        if(!isBusiness){
            return res.json({message: "can not campare your buiness title"})
        }

        let ask = await askService.addAsk({
            user: req.user._id,
            ...req.body
        })
        ask.save();

        let lead = await leadService.addLead({
            admin: req.body.adminId,
            user:  req.user._id,
            askId: ask._id,
            title: req.body.ask
        })
        lead.save();

        res.json({ask, message: "Ask was added"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAllAsks = async (req,res) => {
    try {
        let ask = await askModel.aggregate([
            {
                $match: {
                    "user": req.user._id,
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
        res.json(ask)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateAsk = async (req,res) => {
    try {
        let isAsk = await askService.updateAsk(
            req.body.askId,
            {
                ...req.body
            }
        )

        let isLead = await leadService.updateLead(
            req.body.askId,
            {
                title: req.body.ask
            }
        )
        if (!isAsk) {
            return res.status(400).json({ message: 'Failed to update Ask.'});
        }
        res.json({ message: 'Update Ask Successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteAsk = async (req,res) => {
    try {
        let isAsk = await askService.updateAsk(
            req.body.askId,
            {
                isDelete: true
            }
        )

        // let lead = await leadService.updateLead(
        //     req.body.askId,
        //     {
        //         isDelete: true
        //     }
        // )
        if (!isAsk) {
            return res.status(400).json({ message: 'Failed to delete Ask.' });
        }
        res.json({ isAsk, message: 'Delete Ask Successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.completeTask = async (req,res) => {
    try {
        let lead = await leadService.findLead({askId: req.body.askId, isDelete: false});

        let deal = await dealModel.create({
            admin: lead.admin,
            user: req.user._id,
            totalAmount: req.body.totalAmount
        })
        deal.save();

        let isAsk = await askService.updateAsk(
            req.body.askId,
            {
                isDelete: true
            }
        )

        let isLead = await leadService.updateLead(
            req.body.askId,
            {
                isDelete: true
            }
        )

        res.json({message: "Task Completed"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'Internal Server Error'})
    }
}