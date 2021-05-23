const express = require('express')
const userRouter = express.Router();
const userController = require('../controller/user.controller');

userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
 
module.exports = userRouter;