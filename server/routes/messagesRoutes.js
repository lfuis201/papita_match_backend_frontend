
const express = require('express');
const MessageController = require('.controllers/messageController');
const uri = 'mongodb+srv://lelescanoc:lelescanoc@cluster0.mijc3ip.mongodb.net/dtbasepapita?retryWrites=true&w=majority'

const router = express.Router();
const messageController = new MessageController(uri);

router.get('/messages', (req, res) => messageController.getMessages(req, res));
router.post('/message', (req, res) => messageController.addMessage(req, res));

module.exports = router;
