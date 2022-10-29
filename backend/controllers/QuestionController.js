const Question=require('../models/Question');
const mongoose=require('mongoose');


// GET a All questions
    const getAllQuestion=async(req,res) => {
        const Questions=await Question.find({})
        res.status(200).json(Questions);
    }


// POST a new Question

const createQuestion= async(req,res) => {
    const{title,image,choices,answer}=req.body;
    try{
      const question =await Question.create({title,image,choices,answer});
      res.status(200).json(question);
    } catch(error){
      res.status(400).json({error : error.message})
    }
}

// DELETE an Question 

const deleteQuestion=async(req,res)=>{
    const { id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({error:'No such Question'})
    }
    const Question=await Question.findOneAndDelete({_id: id})
    if(!Question){
        return res.status(400).json({error:'No such Question'});
    }
    res.status(200).json(Question);
}


// UPDATE an Question 
const updateQuestion=async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({error:'No such Question'})
    }
    const Question=await Question.findOneAndUpdate({_id : id},{
        ...req.body 
    })

    if(!Question){
        return res.status(400).json({error:'No such Question'});
    }
    res.status(200).json(Question);

}

module.exports = {
    getAllQuestion,
    createQuestion,
    deleteQuestion,
    updateQuestion,
}