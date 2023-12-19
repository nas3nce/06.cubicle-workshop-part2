const router = require('express').Router();
const { getOne } = require('../services/cubeService');


router.get('/:cubeId', (req, res) => {
    const { cubeId } = req.params;
    const cube = getOne(cubeId);

    if (!cube) {
        res.redirect('/404');
        return;
    }

    res.render('details', cube);
});

module.exports = router;
