const UserService = require('.services/userService');

class UserController {
  constructor(uri) {
    this.userService = new UserService(uri);
  }

  signUp(req, res) {
    this.userService.signUp(req, res);
  }

  login(req, res) {
    this.userService.login(req, res);
  }

  getUser(req, res) {
    this.userService.getUser(req, res);
  }

  addMatch(req, res) {
    this.userService.addMatch(req, res);
  }

  getUsers(req, res) {
    this.userService.getUsers(req, res);
  }

  getGenderedUsers(req, res) {
    this.userService.getGenderedUsers(req, res);
  }

  updateUser(req, res) {
    this.userService.updateUser(req, res);
  }
}

module.exports = UserController;
