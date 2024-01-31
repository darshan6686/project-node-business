const userModel = require('../model/user_model');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req,res,next) => {
    let token = req.headers["authorization"].split(' ')[1];
    // let {userId} = jwt.verify(token, process.env.SECRETE_KEY);
    let {userId} = jwt.verify(token, process.env.SECERT_KEY);
    req.user = await userModel.findOne({_id: userId, isAdmin: false});
    if(req.user){
        next();
    }
    else{
        res.json({message: "Invalide user"})
    }
}