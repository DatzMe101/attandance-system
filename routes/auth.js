const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, validate } = require('../models/user');
const { STATUS } = require('../constants/responseStatus');

router.post('/', async ({ body }, res) => {
  const { error } = validate(body);
  if (error)
    return res.status(STATUS.BAD_REQUEST).send(error.details[0].message);
  const user = await User.findOne({ username: body.username });
  if (!user)
    return res.status(STATUS.BAD_REQUEST).send('Invalid username or password.');
  const isValid = await bcrypt.compare(body.password, user.password);
  if (!isValid)
    return res.status(STATUS.BAD_REQUEST).send('Invalid username or password.');
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
