const router = require('express').Router();

const { create, getAll, getNotOwned } = require('../services/accessoryService');
const { getOne, attachAccessory } = require('../services/cubeService');


router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {

    const { name, description, imageUrl } = req.body;

    await create({
        name,
        description,
        imageUrl,
    });

    res.redirect('/');
});

router.get('/attach/:cubeId', async (req, res) => {
    const cube = await getOne(req.params.cubeId).lean();

    const accessories = await getNotOwned(cube.accessories).lean();

    console.log(cube);
    console.log(accessories);

    const hasAccessories = accessories?.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/attach/:cubeId', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const { cubeId } = req.params;

    await attachAccessory(cubeId, accessoryId);



    res.redirect(`/cube/details/${cubeId}`);
});

module.exports = router;