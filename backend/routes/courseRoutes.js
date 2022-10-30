const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  getCoursesInstructor
} = require('../controllers/courseController');

const {
  createSubTitle,
  getAllSubTitles,
  getSubTitle,
  updateSubTitle,
} = require('../controllers/subTitleController');

router.route('/').post(createCourse).get(getAllCourses);
router.route('/:courseId').get(getCourse).patch(updateCourse);
router.get('/instructor/:id',getCoursesInstructor);

// SubTitle Routes

router.route('/:courseId/subtitle/').post(createSubTitle).get(getAllSubTitles);
router
  .route('/:courseId/subtitle/:subtitleId')
  .get(getSubTitle)
  .patch(updateSubTitle);

module.exports = router;
