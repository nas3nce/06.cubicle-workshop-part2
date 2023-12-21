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

const getOne = (id) => {
    return Cube.findById(id).lean();
};

module.exports = {
    getAll,
    create,
    getOne
};