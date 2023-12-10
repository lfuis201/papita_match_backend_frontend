const { MongoClient } = require('mongodb');

class UserModel {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.collectionName = 'users';
  }

  async createUser(user) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const existingUser = await users.findOne({ email: user.email });

      if (existingUser) {
        throw new Error('User already exists. Please login');
      }

      const sanitizedEmail = user.email.toLowerCase();

      const data = {
        user_id: user.generatedUserId,
        email: sanitizedEmail,
        hashed_password: user.hashedPassword,
      };

      const insertedUser = await users.insertOne(data);

      return insertedUser;
    } finally {
      await this.client.close();
    }
  }

  async getUserByEmail(email) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const user = await users.findOne({ email });

      return user;
    } finally {
      await this.client.close();
    }
  }

  async getUserById(userId) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const query = { user_id: userId };
      const user = await users.findOne(query);

      return user;
    } finally {
      await this.client.close();
    }
  }

  async addMatch(userId, matchedUserId) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const query = { user_id: userId };
      const updateDocument = {
        $push: { matches: { user_id: matchedUserId } },
      };

      const user = await users.updateOne(query, updateDocument);

      return user;
    } finally {
      await this.client.close();
    }
  }

  async updateUser(formData) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const query = { user_id: formData.user_id };

      const updateDocument = {
        $set: {
          first_name: formData.first_name,
          dob_day: formData.dob_day,
          dob_month: formData.dob_month,
          dob_year: formData.dob_year,
          show_gender: formData.show_gender,
          gender_identity: formData.gender_identity,
          gender_interest: formData.gender_interest,
          url: formData.url,
          about: formData.about,
          matches: formData.matches,
        },
      };

      const insertedUser = await users.updateOne(query, updateDocument);

      return insertedUser;
    } finally {
      await this.client.close();
    }
  }

  async getUsersByIds(userIds) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const pipeline = [
        {
          $match: {
            user_id: {
              $in: userIds,
            },
          },
        },
      ];

      const foundUsers = await users.aggregate(pipeline).toArray();

      return foundUsers;
    } finally {
      await this.client.close();
    }
  }

  async getGenderedUsers(gender) {
    try {
      await this.client.connect();
      const database = this.client.db('app-data');
      const users = database.collection(this.collectionName);

      const query = { gender_identity: { $eq: gender } };
      const foundUsers = await users.find(query).toArray();

      return foundUsers;
    } finally {
      await this.client.close();
    }
  }
}

module.exports = UserModel;
