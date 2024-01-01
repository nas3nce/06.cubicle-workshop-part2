const router = require('express').Router();
const { create, getOne, update, del } = require('../services/cubeService');
const { difficultyLevelViewData } = require('../utils/viewData');



router.get('/create', (req, res) => {
    res.render('cube/create');
});


router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user
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

    if (cube.owner) {
        cube.isOwner = cube.owner == req.user?._id;
    }

    res.render('cube/details', cube);
});

router.get('/edit/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const cube = await getOne(cubeId).lean();

    const options = difficultyLevelViewData(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/edit/:cubeId', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const payload = { name, description, imageUrl, difficultyLevel };
    const { cubeId } = req.params;


    await update(cubeId, payload);

    res.redirect(`/cube/details/${cubeId}`);

});


router.get('/delete/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    const cube = await getOne(cubeId).lean();

    const options = difficultyLevelViewData(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });

});

router.post('/delete/:cubeId', async (req, res) => {
    const { cubeId } = req.params;
    await del(cubeId);
    res.redirect('/');
});

module.exports = router;
