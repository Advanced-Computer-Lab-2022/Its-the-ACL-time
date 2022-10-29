const express=require('express');
const router=express.Router();
const {
    createExam,
    getExam,
    deleteExam,
    updateExam,
}=require ('../controllers/ExamController');

// GET a single exercise
router.get('/:id',getExam)

// POST a new Exam 
router.post('/',createExam)

// DELETE an Exam 
router.delete('/:id',deleteExam)

// UPDATE an Exam 
router.patch('/:id',updateExam)


module.exports=router