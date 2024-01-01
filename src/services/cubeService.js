const Cube = require('../models/Cube');


const create = (cubeData) => Cube.create(cubeData);

const getAll = async (search, from, to) => {

    let filteredCubes = await Cube.find().lean();

    if (search) {
        filteredCubes = filteredCubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        filteredCubes = filteredCubes.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        filteredCubes = filteredCubes.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return filteredCubes;

};

const getOne = (id) => Cube.findById(id).populate('accessories');

const attachAccessory = async (cubeId, accessoryId) => {
    const cube = await getOne(cubeId);

    cube.accessories.push(accessoryId);

    return cube.save();
};

const update = async (id, cubeData) => Cube.findByIdAndUpdate(id, cubeData);

const del = async (id) => Cube.findByIdAndDelete(id);


module.exports = {
    getAll,
    create,
    getOne,
    attachAccessory,
    update,
    del
};