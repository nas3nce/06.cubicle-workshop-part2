const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

const register = (userData) => {
    return User.create(userData);
};

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const payload = {
        _id: user._id,
        username: user.username
    };
    const options = { expiresIn: '3d' };

    const token = await jwt.sign(payload, SECRET, options);

    return token;
};



module.exports = {
    register,
    login
};