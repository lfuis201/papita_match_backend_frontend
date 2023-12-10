const MessageService = require('.service/messageService');

class MessageController {
  constructor(uri) {
    this.messageService = new MessageService(uri);
  }

  getMessages(req, res) {
    this.messageService.getMessages(req, res);
  }

  addMessage(req, res) {
    this.messageService.addMessage(req, res);
  }
}

module.exports = MessageController;
