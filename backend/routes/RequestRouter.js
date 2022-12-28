
const express = require('express');

const router = express.Router();

const  {addRequest,getAllRequest,getRequests} = require('../controllers/RequestCourseController');
const {authAdmin} = require('../middlewares');


router.post('/addRequest/:courseId',addRequest);
router.get('/getAllRequest',authAdmin,getAllRequest);
router.get('/getRequests',getRequests);


module.exports = router;
