const router = require('express').Router();
const { create, getAll } = require('../services/cubeService');

router.get('/', (req, res) => {
    res.render('create');
});


router.post('/', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    });

    console.log(getAll());

    res.redirect('/');
});

module.exports = router;
