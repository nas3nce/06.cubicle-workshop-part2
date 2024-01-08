const router = require('express').Router();
const userService = require('../services/userService');
const { exactErrorMsg } = require('../utils/errorHandle');
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await userService.register({ username, password, repeatPassword });

        const token = await userService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');

    } catch (err) {

        const errorMessage = exactErrorMsg(err);

        res.status(404).render('user/register', { errorMessage });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userService.login(username, password);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        console.log({ err });
        const errorMessage = exactErrorMsg(err);

        res.status(404).render('user/login', { errorMessage });
    }


});

router.get('/logout', async (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;