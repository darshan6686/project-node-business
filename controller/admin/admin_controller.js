const UserService = require('../../services/user_services');
const userService = new UserService();
const bcrypt = require('bcrypt');

exports.getProfile = async (req,res) => {
    try {
        let user = await userService.findUser({_id: req.admin._id,isDelete:false})
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
            req.admin._id,
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
        let checkPassword = await bcrypt.compare(password, req.admin.password);
        if (!checkPassword) {
            return res.json({message: 'Incorrect current password'})
        }
    
        let hashedPassword = await bcrypt.hash(newPassword, 6);
        let user = await userService.updateUser(
            req.admin._id,
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
            req.admin._id,
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