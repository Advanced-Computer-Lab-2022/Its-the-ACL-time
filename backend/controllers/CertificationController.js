const CertificationModel = require('../models');


// only for admin
exports.allCertifications = (req,res)=>{
    res.send("all Certification");
}

// only for owner
exports.findCertification = (req,res)=>{
    res.send("get Certification");
}

// only for admin
exports.updateCertification = (req,res)=>{
    res.send("update Certification");
}

// only for admin
exports.deleteCertification = (req,res)=>{
    res.send("delete Certification");
}

// when course is finished
exports.createCertification = (req,res)=>{
    res.send("create Certification");
}

