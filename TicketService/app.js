// export env vars
// const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const flightsRouter = require('./routes/flights');
const dashboardRouter = require('./routes/userDashboard');
const transactionRouter = require('./routes/transaction');
const transactionResultRouter = require('./routes/transactionResult');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/ticket', transactionRouter);
app.use('/transactionResult', transactionResultRouter);
app.use('/dashboard', dashboardRouter);

app.use(flightsRouter)


module.exports = app;
