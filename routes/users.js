const _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, mapper, validate } = require('../models/user');
const { STATUS } = require('../constants/responseStatus');

router.post('/', async ({ body }, res) => {
  const { error } = validate(body);
  if (error)
    return res.status(STATUS.BAD_REQUEST).send(error.details[0].message);
  const existingUser = await User.findOne({ username: body.username });
  if (existingUser)
    return res.status(STATUS.BAD_REQUEST).send('User already registered.');
  try {
    const user = new User(mapper(body));
    const passwordSalt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, passwordSalt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username']));
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = router;
