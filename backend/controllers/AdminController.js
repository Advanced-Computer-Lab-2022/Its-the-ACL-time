const { StatusCodes } = require('http-status-codes');
const { Course, User,Report,CourseRequest,Question} = require('../models');
const { UnauthorizedError, BadRequestError } = require('../Errors');

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
    const type=req.query.type;
    console.log(type);
    console.log(req.body);

      const admin = await User.find({type});
      res.status(200).json(admin);
    
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
    const Questions = await Report.find({status});
    res.status(200).json(Questions);
  };
  
  module.exports.getAllcourserequest = async (req, res) => {
   const courses= await CourseRequest.find({});
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
    );
    
    res.status(200).json(report);
  };
  module.exports.updatecourserequest = async (req, res) => {
    const { id } = req.params;
    const{state}=req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return req.status(404).json({ error: 'No such courserequest' });
    }
    const report = await CourseRequest.findOneAndUpdate(
      { _id: id },
      {
        state: true
      }
    );
    if (!report) {
      return res.status(400).json({ error: 'No such courserequest' });
    }
    res.status(200).json(report);
  };
  /*
  module.exports.udaterefund = async (req, res) => {
    const { id } = req.params.id;
    const{amount,owner}=req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return req.status(404).json({ error: 'No such report' });
    }
    const report = await User.findOneAndUpdate(
      { _id: id ,owner:owner},
      {
        state: state
      }
    );
    if (!report) {
      return res.status(400).json({ error: 'No such report' });
    }
    res.status(200).json(report);
  };

*/
const updateCourse = async (req, res) => {
    const { type, userId } = req.user;
    const { courseId ,promotion} = req.params;
    console.log(req.body);
    if (!courseId) throw new BadRequestError('Please provide course id');
  
    if (type !== 'Admin')
      throw new UnauthorizedError('you are not allowed to update course');
  
    const course = await Course.findOne({ _id: courseId });
    if (!course)
      throw new BadRequestError(`There is no course with this id ${courseId}`);
  
    if (userId !== course.createdBy.toString())
      throw new UnauthorizedError('You are not the owner of that course');
  
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { promotion:promotion },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ updatedCourse });
  };


   