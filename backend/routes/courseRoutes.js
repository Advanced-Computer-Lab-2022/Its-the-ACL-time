const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} = require('../controllers/courseController');


router.route('/').post(createCourse);
router.route('/').get(getAllCourses);
router.route('/:courseId').get(getCourse).patch(updateCourse);

module.exports = router;
