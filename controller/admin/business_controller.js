const Business = require('../../services/business_services');
const business = new Business();

exports.addBusiness = async (req,res) => {
    try {
        let {photo} = req.body;
        let bsns = await business.findBusiness({email: req.body.email,isDelete:false})
        if(bsns){
            return res.json({message: "you can not add your business"})
        }

        let businessPhoto;
            if(req.file){
                businessPhoto = `${req.file.path}`;
            }

        let newBusiness = await business.createBusiness({
            admin: req.admin._id,
            ...req.body,
            photo: businessPhoto
        })
        newBusiness.save();
        res.json({newBusiness, message: "added business"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAllBusiness = async (req,res) => {
    try {
       let isBusiness = await business.findAllBusiness({admin: req.admin._id, isDelete: false});
       res.json(isBusiness); 
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}
exports.getBusiness = async (req,res) => {
    try {
       let isBusiness = await business.findBusiness({name: req.body.name,admin: req.admin._id, isDelete: false});
       if(!isBusiness){
        return res.json({message: "business not found"});
       }
       res.json(isBusiness); 
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.updateBusiness = async (req,res) => {
    try {
        let {photo} = req.body;
        let isBusiness = await business.findBusiness({_id: req.body.businessId, admin: req.admin._id, isDelete: false});
        if (!isBusiness){
            return res.json({message: "business not found"});
        }

        let updatePhoto;
       
            if(req.file){
                updatePhoto = `${req.file.path}`;
            }

        let update = await business.updateBusiness(
            req.body.businessId,
            {
                ...req.body,
                photo: updatePhoto
            }
        )
        res.json({ message:'Update Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteBusiness = async (req,res) => {
    try {
        let isBusiness = await business.findBusiness({_id: req.body.businessId,admin: req.admin._id, isDelete: false});
        if(!isBusiness){
            return res.json({message:"No Business Found!"});
        }

        isBusiness = await business.updateBusiness(
            req.body.businessId,
            {
                isDelete: true
            }
        )
        res.json({message: "bussiness deleted"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}