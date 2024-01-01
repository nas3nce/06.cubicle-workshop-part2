const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

const app = express();

const expressConfig = (app) => {
    //Setup Static Files
    app.use(express.static(path.resolve(__dirname, '../public')));
    //Body Parser
    app.use(express.urlencoded({ extended: false }));
    //Cookie Parser
    app.use(cookieParser());
    //Custom Auth Middleware
    app.use(auth);
};

module.exports = {
    app,
    expressConfig
};