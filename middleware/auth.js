const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config.json');
const { STATUS } = require('../constants/responseStatus');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(STATUS.ACCESS_DENIED)
      .send('Access Denied. No token provided');
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(STATUS.BAD_REQUEST).send('Invalid token.');
  }
};
