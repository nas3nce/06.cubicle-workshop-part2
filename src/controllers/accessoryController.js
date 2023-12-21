const router = require('express').Router();

const { create, getAll } = require('../services/accessoryService');
const { getOne } = require('../services/cubeService');


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

    const accessories = await getAll();
    const hasAccessories = accessories.length > 0;

    const cube = await getOne(req.params.cubeId);

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

module.exports = router;