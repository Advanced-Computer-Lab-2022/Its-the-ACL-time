const { StatusCodes } = require('http-status-codes');
const { Course, User } = require('../models');
const { UnauthorizedError, BadRequestError } = require('../Errors');

module.exports.createUser = async (req, res) => {
    console.log('req.body ' + req.body);
    const { username, email, password, type} = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !type 
      
    ) {
      throw new BadRequestError('Please provide all admin values');
    }
    //req.body.createdBy = userId;
  
    const admin = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ admin });
  };
  module.exports.getuser=async(req,res) => {
    const{ id }=req.params;

    if(!id){
        return new BadRequestError('please provide right id')
    }

    const user=await User.findById(id)
    if(!user){
        return new BadRequestError('please provide right id')
    }
    res.status(200).json(user);
}
module.exports.deleteuser=async(req,res)=>{
    const { id }=req.params
    if(!id){
        return new BadRequestError('please provide right id')
    }
    const user=await User.findOneAndDelete({_id: id})
    if(!user){
        return new BadRequestError('please provide right id')
    }
    res.status(200).json(user);
}
module.exports.updateuser=async(req,res)=>{
    const{id} = req.params
    if(!id){
        return new BadRequestError('please provide right id')
    }
    const user=await User.findOneAndUpdate({_id : id},{
        ...req.body 
    })

    if(!user){
        return new BadRequestError('please provide right id')
    }
    res.status(200).json(user);

}

   