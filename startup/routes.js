const express = require('express');
const cors = require('cors');
const users = require('../routes/users');
const auth = require('../routes/auth');
const students = require('../routes/students');

module.exports = app => {
  app.use(express.json());
  app.use(cors({ origin: '*' }));
  app.use('/api/register', users);
  app.use('/api/login', auth);
  app.use('/api/students', students);
};
