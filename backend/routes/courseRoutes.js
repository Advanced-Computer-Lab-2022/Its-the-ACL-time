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

const {
  createSubTitle,
  getAllSubTitles,
  getSubTitle,
  updateSubTitle,
} = require('../controllers/subTitleController');

router.route('/').post(createCourse);
router.route('/').get(getAllCourses);
router.route('/:courseId').get(getCourse).patch(updateCourse);

router.route('/:courseId/subtitle/').post(createSubTitle).get(getAllSubTitles);
router
  .route('/:courseId/subtitle/:subtitleId')
  .get(getSubTitle)
  .patch(updateSubTitle);

module.exports = router;
