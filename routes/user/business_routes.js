const express = require('express');
const { verifyToken } = require('../../middleware/tokenUser');
const { showAllBusiness, showBusiness } = require('../../controller/user/business_controller');
const businessRoute = express.Router();

businessRoute.get('/showall-business', verifyToken, showAllBusiness)
businessRoute.get('/show-business', verifyToken, showBusiness)

module.exports = businessRoute