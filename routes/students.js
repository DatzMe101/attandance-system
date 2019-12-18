const express = require('express');
const router = express.Router();
const { Student, validate, mapper } = require('../models/student');
const { STATUS } = require('../constants/responseStatus');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', [auth, admin], async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
});
router.get('/:id', [auth, admin], async ({ params }, res) => {
  try {
    const student = await Student.findById(params.id);
    if (!student) return res.status(STATUS.NOT_FOUND).send('Student not found');
    res.send(student);
  } catch (error) {
    res.status(STATUS.NOT_FOUND).send('Student not found');
  }
});
router.post('/', [auth, admin], async ({ body }, res) => {
  const { error } = validate(body);
  if (error)
    return res.status(STATUS.BAD_REQUEST).send(error.details[0].message);
  try {
    const existingStudent = await Student.findOne({
      studentId: body.studentId
    });
    if (existingStudent)
      return res.status(STATUS.BAD_REQUEST).send('Student already registered');
    const student = new Student(mapper(body));
    const result = await student.save();
    res.send(result);
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
});
router.post('/', [auth, admin], async ({ body }, res) => {
  const { error } = validate(body);
  if (error)
    return res.status(STATUS.BAD_REQUEST).send(error.details[0].message);
  try {
    const existingStudent = await Student.findOne({
      studentId: body.studentId
    });
    if (existingStudent)
      return res.status(STATUS.BAD_REQUEST).send('Student already registered');
    const student = new Student(mapper(body));
    const result = await student.save();
    res.send(result);
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).send(error);
  }
});

router.put('/:id', [auth, admin], async ({ body, params }, res) => {
  const { error } = validate(body);
  if (error)
    return res.status(STATUS.BAD_REQUEST).send(error.details[0].message);
  try {
    const { studentId, ...studentModel } = mapper(body);
    const student = await Student.findByIdAndUpdate(params.id, studentModel, {
      new: true
    });
    if (!student) return res.status(STATUS.NOT_FOUND).send('Student not found');
    res.send(student);
  } catch (error) {
    res.status(STATUS.NOT_FOUND).send('Student not found');
  }
});

router.delete('/:id', [auth, admin], async ({ params }, res) => {
  try {
    const student = await Student.findByIdAndRemove(params.id);
    if (!student) return res.status(STATUS.NOT_FOUND).send('Student not found');
    res.send(student);
  } catch (error) {
    res.status(STATUS.NOT_FOUND).send('Student not found');
  }
});

module.exports = router;
