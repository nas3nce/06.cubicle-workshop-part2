const router = require('express').Router();
const { create, getAll, getOne } = require('../services/cubeService');

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

    const cube = await getOne(cubeId);


    if (!cube) {
        res.redirect('/404');
        return;
    }

    res.render('cube/details', cube);
});



module.exports = router;
