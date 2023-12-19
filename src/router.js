const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const createController = require('./controllers/createController');

router.use(homeController);
router.use('/create', createController);
router.use('/details', cubeController);

router.get('*', (req, res) => {
    res.redirect('/404');
});


module.exports = router;