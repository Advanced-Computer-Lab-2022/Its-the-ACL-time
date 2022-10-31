const express=require('express');
const router=express.Router();
const AdminController=require ('../controllers/AdminController');

// GET a single exercise

// POST a new Exam 
router.post('/',AdminController.createUser);
// get user 
router.get('/:id',AdminController.getuser)
// DELETE an user 
router.delete('/:id',AdminController.deleteuser)

// UPDATE an user 
router.patch('/:id',AdminController.updateuser)




module.exports=router