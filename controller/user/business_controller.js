const Business = require('../../services/business_services');
const business = new Business();

exports.showAllBusiness = async (req,res) => {
    try {
        let isBusiness = await business.findAllBusiness({isDelete: false});
        res.json(isBusiness)
    } catch (err) {
        console.log(err);
    }
}

exports.showBusiness = async (req,res) => {
    try {
        let isBusiness = await business.findAllBusiness({_id: req.body.businessId,isDelete: false});
        if(!isBusiness){
            return res.json({message: "business not found"});
        }
        res.json(isBusiness)
    } catch (err) {
        console.log(err);
    }
}