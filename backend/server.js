require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// db
const connectDB = require('./db');

// middleware
const {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authMiddleware,
} = require('./middlewares');

// Routes
const { authRouter, courseRouter, userRouter } = require('./routes');
//Michael
const examRouter = require('./routes/examRoutes');
const adminroutes = require('./routes/AdminRoutes');
//const questionRouter = require('./routes/questionRoutes');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/auth', authRouter);

// app.use('/api/v1/user', authMiddleware, userRouter);
app.use('/api/v1/user', userRouter);
// app.use('/api/v1/course', authMiddleware, courseRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminroutes);

//Michael
app.use('/api/v1/exam', examRouter);
//app.use('/api/v1/exam',questionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
