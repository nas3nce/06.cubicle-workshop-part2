const Cube = require('../models/Cube');

const cubes = [];

const create = async (cubeData) => {

    await Cube.create(cubeData);   
};

const getAll = (search, from, to) => {
    let filteredCubes = [...cubes];

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
    return cubes.find(cube => cube.id == id);
};

module.exports = {
    getAll,
    create,
    getOne
};