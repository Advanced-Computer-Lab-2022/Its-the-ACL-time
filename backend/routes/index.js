const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const courseRouter = require('./courseRoutes');
const examRouter = require('./examRoutes');
const questionRouter = require('./questionRoutes');
const notesRouter = require('./NotesRoutes');

module.exports = {
  authRouter,
  userRouter,
  courseRouter,
  notesRouter,
};
