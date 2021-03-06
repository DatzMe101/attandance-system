const Joi = require('joi');
const mongoose = require('mongoose');

const validate = data => {
  const schema = {
    studentId: Joi.string().required(),
    name: Joi.string().required(),
    userId: Joi.string().required(),
    course: Joi.string()
      .allow('')
      .optional(),
    year: Joi.number()
      .allow(0)
      .optional(),
    gender: Joi.string()
      .allow('')
      .optional()
  };
  return Joi.validate(data, schema);
};

const mapper = data => {
  return (
    data && {
      studentId: data.studentId,
      name: data.name,
      userId: data.userId,
      course: data.course,
      year: data.year,
      gender: data.gender
    }
  );
};

const Student = mongoose.model('Student', {
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  course: String,
  year: Number,
  gender: String
});

module.exports = { Student, validate, mapper };
