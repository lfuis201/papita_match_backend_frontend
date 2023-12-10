const express = require('express');
const UserController = require('.controllers/userController');
const uri = 'mongodb+srv://lelescanoc:lelescanoc@cluster0.mijc3ip.mongodb.net/dtbasepapita?retryWrites=true&w=majority'

const router = express.Router();
const userController = new UserController(uri);

router.post('/signup', (req, res) => userController.signUp(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/user', (req, res) => userController.getUser(req, res));
router.put('/addmatch', (req, res) => userController.addMatch(req, res));
router.get('/users', (req, res) => userController.getUsers(req, res));
router.get('/gendered-users', (req, res) => userController.getGenderedUsers(req, res));
router.put('/user', (req, res) => userController.updateUser(req, res));

module.exports = router;
