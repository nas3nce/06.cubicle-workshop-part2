const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,

    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ]
});

const Accessory = new mongoose.model('Accessory', accessorySchema);

module.exports = Accessory

