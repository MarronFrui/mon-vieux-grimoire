const express = require('express');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  // TODO: hash password, save user → { message }
});

router.post('/login', (req, res, next) => {
  // TODO: verify credentials → { userId, token }
});

module.exports = router;
