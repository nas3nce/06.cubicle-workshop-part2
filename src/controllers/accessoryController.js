const router = require('express').Router();

const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');


router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {

    const { name, description, imageUrl } = req.body;

    await accessoryService.create({
        name,
        description,
        imageUrl,
    });

    res.redirect('/');
});

router.get('/attach/:cubeId', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    const accessories = await accessoryService.getNotOwned(cube.accessories).lean();

    const hasAccessories = accessories?.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/attach/:cubeId', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const { cubeId } = req.params;

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cube/details/${cubeId}`);
});

module.exports = router;