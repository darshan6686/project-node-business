const express = require('express');
const { upload } = require('../middleware/imageUploader');
const { signUp, login, getProfile, updateProfile, changePassword, deleteProfile } = require('../controller/user_controller');
const { verifyToken } = require('../middleware/tokenUser');
const userRoute = express.Router();

userRoute.post('/signUp', upload.single('photo'), signUp);
userRoute.post('/login', login);
userRoute.get('/get-profile', verifyToken, getProfile);
userRoute.put('/update-profile', upload.single('photo'), verifyToken, updateProfile);
userRoute.put('/change-password', verifyToken, changePassword);
userRoute.delete('/delete-profile', verifyToken, deleteProfile);

module.exports = userRoute