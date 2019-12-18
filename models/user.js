const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config.json');

const validate = data => {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    roleId: Joi.number()
      .allow('')
      .optional()
  };
  return Joi.validate(data, schema);
};

const mapper = data => {
  return (
    data && {
      username: data.username,
      password: data.password,
      roleId: data.roleId
    }
  );
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Number }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, roleId: this.roleId }, jwtPrivateKey);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = { User, validate, mapper };
