const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');

const { isAuth } = require('./middlewares/authMiddleware');


router.use(homeController);
router.use('/cube', cubeController);
router.use('/accessory', isAuth, accessoryController);
router.use('/user', userController);

router.get('*', (req, res) => {
    res.redirect('/404');
});


module.exports = router;