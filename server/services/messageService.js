const MessageModel = require('.model/messageModel');

class MessageService {
  constructor(uri) {
    this.messageModel = new MessageModel(uri);
  }

  async getMessages(req, res) {
    const { userId, correspondingUserId } = req.query;

    try {
      const foundMessages = await this.messageModel.getMessages(
        userId,
        correspondingUserId
      );

      res.send(foundMessages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addMessage(req, res) {
    const message = req.body.message;

    try {
      const insertedMessage = await this.messageModel.addMessage(message);

      res.send(insertedMessage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = MessageService;
