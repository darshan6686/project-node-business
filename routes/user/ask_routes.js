const express = require('express');
const { verifyToken } = require('../../middleware/tokenUser');
const { addAsk, getAllAsks, updateAsk, deleteAsk, completeTask } = require('../../controller/user/ask_controller');
const askRoute = express.Router();

askRoute.post('/add-ask',verifyToken, addAsk);
askRoute.get('/getall-ask', verifyToken, getAllAsks);
askRoute.put('/update-ask', verifyToken, updateAsk);
askRoute.delete('/delete-ask', verifyToken, deleteAsk);
askRoute.post('/complete-ask', verifyToken, completeTask);

module.exports = askRoute