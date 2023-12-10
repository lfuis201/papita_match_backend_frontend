const { MongoClient } = require('mongodb');

class MessageModel {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.collectionName = 'messages';
  }

  async getMessages(userId, correspondingUserId) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const messages = database.collection(this.collectionName);

      const query = {
        from_userId: userId,
        to_userId: correspondingUserId
      };

      const foundMessages = await messages.find(query).toArray();

      return foundMessages;
    } finally {
      await this.client.close();
    }
  }

  async addMessage(message) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const messages = database.collection(this.collectionName);

      const insertedMessage = await messages.insertOne(message);

      return insertedMessage;
    } finally {
      await this.client.close();
    }
  }
}

module.exports = MessageModel;
