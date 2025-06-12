const express = require('express');
const signup = require('../controlsfunction/signup');

const signupRouter = express.Router();

signupRouter.post('/', signup);
signupRouter.get('/', (req, res) => {
  res.json({
    message:"iam the message"
  });
});

module.exports = signupRouter;