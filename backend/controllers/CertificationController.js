const CertificationModel = require('../models');

// only for admin
const allCertifications = (req, res) => {
  res.send('all Certification');
};

// only for owner
const findCertification = (req, res) => {
  res.send('get Certification');
};

// only for admin
const updateCertification = (req, res) => {
  res.send('update Certification');
};

// only for admin
const deleteCertification = (req, res) => {
  res.send('delete Certification');
};

// when course is finished
const createCertification = (req, res) => {
  res.send('create Certification');
};

module.exports = {
  allCertifications,
  findCertification,
  updateCertification,
  deleteCertification,
  createCertification,
};
