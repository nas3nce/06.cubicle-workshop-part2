const router = require('express').Router();
const { create, getOne } = require('../services/cubeService');
const { getById } = require('../services/accessoryService');


router.get('/create', (req, res) => {
    res.render('cube/create');
});


router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    });

    res.redirect('/');
});

router.get('/details/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const cube = await getOne(cubeId).lean();

    if (!cube) {
        res.redirect('/404');
        return;
    }

    res.render('cube/details', cube);
});



module.exports = router;
