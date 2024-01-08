const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: [true, 'Username required!'],
        minLength: [5, 'Username should be at least 5 characters long'],
        match: [/^[a-zA-Z0-9]+$/, 'Only letters and number characters allowed'],
        unique: {
            value: true,
            message: 'Username Already Exists!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password required!'],
        minLength: [8, 'Password should be at least 8 characters long'],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Only letters and number characters allowed'
        }
    }
});

userSchema.path('username').validate(function (username) {
    const user = mongoose.model('User').findOne({ username });
    return !!user;
});

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password Mismatch');
    }
}, 'Username Already Exists!');

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;