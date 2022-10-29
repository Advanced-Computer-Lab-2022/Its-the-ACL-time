const { VideoNotesModel } = require('../models');
const { StatusCodes } = require('http-status-codes');

// need authentication allowed for req owner
const findVideoNotes = async (req, res) => {
  const {user,video} = req.body;
  VideoNotesModel.find({"user":user,"video":video}, (err, VideoNotes) => {
    if (err) {
      res.status(StatusCodes.NOT_FOUND).send(err);
    } else {
      res.status(StatusCodes.OK).json({ VideoNotes });
    }
  });
};

// allowed only for admin
const addVideoNotes = async (req, res) => {
  const { user, video,description} = req.body;
  VideoNotesModel.create({ user, video,description}, (err, VideoNotes) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.CREATED).json({ VideoNotes });
    }
  });
};


const updateVideoNotes = async (req, res) => {
  const {description} = req.body;
  const id = req.params.id;
  VideoNotesModel.findByIdAndUpdate(
    id,
    {description},
    (err, VideoNotes) => {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
      } else {
        res.status(StatusCodes.OK).json({ VideoNotes });
      }
    }
  );
};


const allVideoNotes = async (req, res) => {
  console.log('all wallets');
  VideoNotesModel.find({}, (err, data) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.OK).json({ data });
    }
  });
};


const deleteVideoNotes = async (req, res) => {
  const id = req.params.id;
  VideoNotesModel.findByIdAndDelete(id, (err, VideoNotes) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.ACCEPTED).json({ VideoNotes });
    }
  });
};

module.exports = {
  findVideoNotes,
  addVideoNotes,
  updateVideoNotes,
  allVideoNotes,
  deleteVideoNotes,
};




