

const CourseRequest = require("../models/CourseRequest");


const getAllRequest = async (req, res) => {
    let requests = await CourseRequest.find({});
    res.status(200).json(requests);
}

const addRequest = async (req, res) => {
    const { userId } = req.user;
    const { courseId } = req.params;
    let request = new CourseRequest({ course: courseId, createBy: userId, state: "PENDING" });
    await request.save();
    res.json(201).json(request);
}

const getRequests = async (req,res)=>{
    const {userId} = req.user;
    let requests = CourseRequest.find({createBy:userId});
    res.json(200).json(requests);
}


module.exports = {addRequest,getAllRequest,getRequests};



