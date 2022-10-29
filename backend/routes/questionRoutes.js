const express=require('express');
const router=express.Router();
const {
    createQuestion,
    getAllQuestion,
    deleteQuestion,
    updateQuestion,
}=require ('../controllers/QuestionController');

// GET All Question
router.get('/:id',getAllQuestion)

// POST a new Question
router.post('/',createQuestion)

// DELETE an Question 
router.delete('/:id',deleteQuestion)

// UPDATE an Question
router.patch('/:id',updateQuestion)


module.exports=router