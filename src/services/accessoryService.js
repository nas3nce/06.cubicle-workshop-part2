const Accessory = require('../models/Accessory');

const create = (accessoryData) => Accessory.create(accessoryData);

const getAll = async () => await Accessory.find().lean();

module.exports = {
    create,
    getAll
};