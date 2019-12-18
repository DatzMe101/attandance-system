const { STATUS } = require('../constants/responseStatus');
const { ROLE } = require('../constants/role');
module.exports = function({ user }, res, next) {
  const isAdmin = user && user.roleId === ROLE.ADMINISTRATOR;
  if (!isAdmin) return res.status(STATUS.FORBIDDEN).send('Access denied.');
  next();
};
