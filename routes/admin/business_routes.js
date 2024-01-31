const express = require('express');
const { addBusiness, getBusiness, updateBusiness, deleteBusiness, getAllBusiness } = require('../../controller/admin/business_controller');
const { upload } = require('../../middleware/imageUploader');
const { tokenAdmin } = require('../../middleware/tokenAdmin');
const businessRoute = express.Router();

businessRoute.post('/add-business', upload.single('photo'), tokenAdmin ,addBusiness);
businessRoute.get('/getall-business', tokenAdmin, getAllBusiness);
businessRoute.get('/get-business', tokenAdmin, getBusiness)
businessRoute.put('/update-business', upload.single('photo'), tokenAdmin, updateBusiness);
businessRoute.delete('/delete-business', tokenAdmin, deleteBusiness);

module.exports = businessRoute