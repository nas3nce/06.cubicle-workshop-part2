const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

const auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (err) {
            console.log({ err });
            res.cookieClear('auth');
            res.redirect('/user/login');
        }
    } else {
        next();
    }

};

const isAuth = async (req, res, next) => {

    if (!req.user) {
        return res.redirect('/');
    }

    next();
};

module.exports = {
    auth,
    isAuth
};