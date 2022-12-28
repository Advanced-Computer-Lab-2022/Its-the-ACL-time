const { StatusCodes } = require('http-status-codes');
const { Course, User,Report,CourseRequest,Question,Wallet} = require('../models');
const { UnauthorizedError, BadRequestError } = require('../Errors');
const { json } = require('express');

module.exports.createUser = async (req, res) => {
   // console.log('req.body ' + req.body);
  
    const { username, email, password, type} = req.body;
   // console.log('req.body ' + username,email,password,type);
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
  module.exports.getuser = async (req, res) => {
      const user = await User.find({});
      res.status(200).json(user);
    
  };
  module.exports.createreport = async (req, res) => {
    const { title, status, type} = req.body;
    // console.log('req.body ' + username,email,password,type);
     if (
       !status ||
       !title ||
       
       !type 
       
     ) {
       throw new BadRequestError('Please provide all report values');
     }
     //req.body.createdBy = userId;
   
     const report = await Report.create(req.body);
     res.status(StatusCodes.CREATED).json({ report });
    
  };
  
  
 module.exports.getAllreport = async (req, res) => {
    const status=req.query.status;
    const Questions = await Report.find({status}).populate("createdBy","username").populate("course","title");
    res.status(200).json(Questions);
  };
  
  module.exports.getAllcourserequest = async (req, res) => {
   const courses= await CourseRequest.find({}).populate('createdBy', 'username').populate("course","title");
    //const courses = await CoursesRequest.find({});
    res.status(200).json(courses);
  };
 module.exports.updatereport = async (req, res) => {

  //  console.log("id"+id ,state);
    console.log("req.body"+req.body);
    const report = await Report.findByIdAndUpdate(
      {_id:req.body.id},
      {
        status: req.body.state
      }
    ).populate("createdBy","username").populate("course","title");
    
    res.status(200).json(report);
  };
  
  module.exports.updatecourserequest = async (req, res) => {
    const { id } = req.body;
    const{courseid,state}=req.body;
    console.log("id:"+id)
    const courserequest= await CourseRequest.findOne({
      createdBy:id,
      course:courseid
    }).populate("createdBy","username").populate("course","title")  
  if(state=="GRANTED"){
    const user = await User.findOne(
      { _id: id }
    );
    console.log(user)
      user.courses.push({courseId:courseid})
      await user.save();
   
    if (courserequest!=null){
    courserequest.state="GRANTED"
    courserequest.save();}
    }
    else{
    
      if (courserequest!=null){
      courserequest.state="DENIED"
      courserequest.save();}
    }
    res.status(200).json(courserequest);
  };
  
  module.exports.getallcourses = async (req, res) => {
    const courses= await Course.find({});
     //const courses = await CoursesRequest.find({});
     res.status(200).json(courses);
   };

  
  module.exports.udaterefund = async (req, res) => {
    const { id } = req.body;
    const{courseid,RefundId}=req.body;
    const user = await User.findOne(
      { _id: id },
    );
   const course = await Course.findOne(
      { _id: courseid },
    );
    const wallet = await Wallet.findOne(
      { owner: id },
    );
    const refund = await RefundId.findOne(
      { _id: RefundId },
    );
    wallet.balance+=course.price;
    wallet.save();
    refund.state=true;
    refund.save();
    user.courses=user.courses.filter((x)=>x._id!==courseid)
    user.save();
    res.status(200).json(refund);
  };


module.exports.setpromtion = async (req, res) => {
    const { coursesId ,promotion} = req.body;
    console.log(coursesId);

    for(let i=0;i<coursesId.length;i++){
      console.log(coursesId[i])

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: coursesId[i] },
      { promotion:promotion },
    );}


    const course= await Course.find({});

    
    res.status(StatusCodes.OK).json( course );
  };
  module.exports.setcomment = async (req, res) => {
    const { reportId,comment} = req.body;
    console.log(req.body);
    const report= await Report.findOne({_id:reportId }).populate("createdBy","username").populate("course","title");
    console.log(report)
    report.commentsadmin.push(comment);
    report.save();
    res.status(StatusCodes.OK).json( report );
  };
  module.exports.usersetcomment = async (req, res) => {
    const { reportId,comment} = req.body;
    console.log(req.body);
    const report= await Report.findOne({_id:reportId }).populate("createdBy","username").populate("course","title");
   // console.log(report)
    report.commentsuser.push(comment);
    report.save();
    console.log(report)
    res.status(StatusCodes.OK).json( report );
  };



   