const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;