const UserService = require('../services/user_services');
const userService = new UserService();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res) => {
    try {
        let {password, photo} = req.body
        let user = await userService.findUser({email: req.body.email, mobileNumber: req.body.mobileNumber,isDelete:false});
        if(user){
            return res.json({message: "you can not signup, something wrong"});
        }

        let hashedPassword = await bcrypt.hash(password,6);
        let imagepath;
        if(req.file){
            imagepath = `${req.file.path}`
        }
        let newUser = await userService.createUser({
            ...req.body,
            password: hashedPassword,
            photo: imagepath
        })
        newUser.save();
        res.json({newUser, message: "User added"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.login = async (req,res) => {
    try{
        const {password} = req.body;
        let user = await userService.findUser({email: req.body.email,isDelete:false});
        if(!user){
            return res.json({message:"User does not exist."});
        }
        let checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.json({message:"Invalid Password."});
        }
        let playload = {
            userId: user._id
        }
        let token = jwt.sign(playload, process.env.SECERT_KEY);
        res.json({token, message: "login successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({messge: "Internal Server Error"});
    }
}

exports.getProfile = async (req,res) => {
    try {
        let user = await userService.findUser({_id: req.user._id,isDelete:false})
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateProfile = async (req,res) => {
    try {
        let {photo} = req.body;
        let profileImage;
       
        if(req.file){
            imagepath = `${req.file.path}`
        }
        let user = await userService.updateUser(
            req.user._id,
            {
                ...req.body,
                photo: profileImage
            }
        )
        res.json({user, message: "profile update sucessfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"})
    }
}

exports.changePassword = async (req,res) => {
    try {
        let {password, newPassword} = req.body;
        let checkPassword = await bcrypt.compare(password, req.user.password);
        if (!checkPassword) {
            return res.json({message: 'Incorrect current password'})
        }
    
        let hashedPassword = await bcrypt.hash(newPassword, 6);
        let user = await userService.updateUser(
            req.user._id,
            {
                password: hashedPassword
            }
        )
        user.save();
        res.json({message: "password update successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.deleteProfile = async (req,res) => {
    try {
        let user = await userService.updateUser(
            req.user._id,
            {
                isDelete: true
            }
        )
        res.json({user, message: "profile deleted sucessfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}