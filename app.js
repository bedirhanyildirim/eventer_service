/* Libs */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Router Include */
const foodMenuRouters = require('./api/routers/foodmenu');
const clubsRouters = require('./api/routers/clubs');
const eventsRouters = require('./api/routers/events');
const userRouters = require('./api/routers/user');
const uniRouter = require('./api/routers/university');

/* Mongoose */
mongoose.connect('mongodb://bedirhanyildirim:' + process.env.MONGO_ATLAS_PW + '@student-club-otomation-shard-00-00-qxdz9.mongodb.net:27017,student-club-otomation-shard-00-01-qxdz9.mongodb.net:27017,student-club-otomation-shard-00-02-qxdz9.mongodb.net:27017/test?ssl=true&replicaSet=student-club-otomation-shard-0&authSource=admin&retryWrites=true',{useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

/* Middleware */
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* CORS Headers */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

/* Routers */
app.use('/foodmenu', foodMenuRouters);
app.use('/clubs', clubsRouters);
app.use('/events', eventsRouters);
app.use('/user', userRouters);
app.use('/university', uniRouter);

/* 404 Error */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

/* 500 Error */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

module.exports = app;
