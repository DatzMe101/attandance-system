const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect('mongodb://localhost/attendanceSystemDb', {
      useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Error in connecting to MongoDB'));
};

module.exports = connect;
