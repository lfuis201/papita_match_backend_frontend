const UserModel = require('.model/userModel');

class UserService {
  constructor(uri) {
    this.userModel = new UserModel(uri);
  }

  async signUp(req, res) {
    const { email, password } = req.body;
    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const insertedUser = await this.userModel.createUser({
        email,
        generatedUserId,
        hashedPassword,
      });

      const token = jwt.sign(insertedUser, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: generatedUserId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.userModel.getUserByEmail(email);

      const correctPassword = await bcrypt.compare(password, user.hashed_password);

      if (user && correctPassword) {
        const token = jwt.sign(user, email, {
          expiresIn: 60 * 24,
        });
        res.status(201).json({ token, userId: user.user_id });
      }

      res.status(400).json('Invalid Credentials');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUser(req, res) {
    const userId = req.query.userId;

    try {
      const user = await this.userModel.getUserById(userId);
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addMatch(req, res) {
    const { userId, matchedUserId } = req.body;

    try {
      const user = await this.userModel.addMatch(userId, matchedUserId);
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUsers(req, res) {
    const userIds = JSON.parse(req.query.userIds);

    try {
      const foundUsers = await this.userModel.getUsersByIds(userIds);
      res.json(foundUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getGenderedUsers(req, res) {
    const gender = req.query.gender;

    try {
      const foundUsers = await this.userModel.getGenderedUsers(gender);
      res.json(foundUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req, res) {
    const formData = req.body.formData;

    try {
      const updatedUser = await this.userModel.updateUser(formData);
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserService;
