const express = require('express');
const businessRoute = require('./business_routes');
const adminRoute = require('./admin_rotutes');
const leadRouter = require('./lead_routes');
const router = express.Router();

router.use('/business', businessRoute);
router.use('/', adminRoute);
router.use('/lead', leadRouter);

module.exports = router