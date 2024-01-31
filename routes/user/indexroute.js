const express = require('express');
const businessRoute = require('./business_routes');
const askRoute = require('./ask_routes');
const indexRoute = express.Router();

indexRoute.use('/business', businessRoute)
indexRoute.use('/ask', askRoute);

module.exports = indexRoute