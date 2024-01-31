const express = require('express');
const { tokenAdmin } = require('../../middleware/tokenAdmin');
const { getProfile, updateProfile, changePassword, deleteProfile } = require('../../controller/admin/admin_controller');
const adminRoute = express.Router();

adminRoute.get('/get-profile', tokenAdmin, getProfile);
adminRoute.put('/update-profile', tokenAdmin, updateProfile);
adminRoute.put('/change-password', tokenAdmin, changePassword);
adminRoute.delete('/delete-profile', tokenAdmin, deleteProfile);

module.exports = adminRoute