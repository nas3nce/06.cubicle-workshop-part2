const path = require('path');
const express = require('express');

const app = express();

const expressConfig = (app) => {
    //Setup Static Files
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(express.urlencoded({ extended: false }));
};

module.exports = {
    app,
    expressConfig
};