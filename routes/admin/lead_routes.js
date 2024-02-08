const express = require('express');
const { tokenAdmin } = require('../../middleware/tokenAdmin');
const { getAllLead, getLead, deleteRead } = require('../../controller/admin/lead_controller');
const leadRouter = express.Router();

leadRouter.get('/getall-lead', tokenAdmin, getAllLead);
leadRouter.get('/get-lead', tokenAdmin, getLead);
leadRouter.delete('/delete-lead', tokenAdmin, deleteRead)

module.exports = leadRouter