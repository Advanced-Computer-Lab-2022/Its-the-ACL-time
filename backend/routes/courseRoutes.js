const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} = require('../controllers/courseController');

const {
  createSubTitle,
  getAllSubTitles,
  getSubTitle,
  updateSubTitle,
} = require('../controllers/subTitleController');

router.route('/').post(createCourse).get(getAllCourses);
router.route('/:courseId').get(getCourse).patch(updateCourse);

// SubTitle Routes

router.route('/:courseId/subtitle/').post(createSubTitle).get(getAllSubTitles);
router
  .route('/:courseId/subtitle/:subtitleId')
  .get(getSubTitle)
  .patch(updateSubTitle);

module.exports = router;
