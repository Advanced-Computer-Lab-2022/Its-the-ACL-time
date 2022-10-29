const Exam=require('../models/Exam');
const mongoose=require('mongoose');


// GET a single exercise
    const getExam=async(req,res) => {
        const{ id }=req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return req.status(404).json({error:'No such Exam'})
        }

        const exam=await Exam.findById(id)
        if(!exam){
            return res.status(400).json({error:'No such Exam'});
        }
        res.status(200).json(exam);
    }


// POST a new Exam 

const createExam= async(req,res) => {
    const{course,duration,questions,grade}=req.body;
    try{
      const exam =await Exam.create({course,duration,questions,grade});
      res.status(200).json(exam);
    } catch(error){
      res.status(400).json({error : error.message})
    }
}

// DELETE an Exam 

const deleteExam=async(req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({error:'No such Exam'})
    }
    const exam=await Exam.findOneAndDelete({_id: id})
    if(!exam){
        return res.status(400).json({error:'No such Exam'});
    }
    res.status(200).json(exam);
}


// UPDATE an Exam 
const updateExam=async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({error:'No such Exam'})
    }
    const exam=await Exam.findOneAndUpdate({_id : id},{
        ...req.body 
    })

    if(!exam){
        return res.status(400).json({error:'No such Exam'});
    }
    res.status(200).json(exam);

}

module.exports = {
    getExam,
    createExam,
    deleteExam,
    updateExam,
}