const Accessory = require('../models/Accessory');

const create = (accessoryData) => Accessory.create(accessoryData);

const getAll = () => Accessory.find().lean();

const getById = (id) => Accessory.findById(id);

const getNotOwned = (accessoryIds) => {
    return Accessory.find({ _id: { $nin: accessoryIds } });
};

module.exports = {
    create,
    getAll,
    getById,
    getNotOwned
};

