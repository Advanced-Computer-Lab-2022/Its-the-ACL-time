require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routes/authRoutes');
const { errorHandlerMiddleware, notFoundMiddleware } = require('./middlewares');
const connectDB = require('./db');

// middlewares
const corsOptions = {
  origin:
    process.env.ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/auth', authRouter);

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
