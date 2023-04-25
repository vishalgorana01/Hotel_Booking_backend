const jwt = require('jsonwebtoken');
const createError = require('../utils/error.js');
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, resp, next) => {
    const token = req.cookies.acces_token;
    if (!token) {
        return next(createError(401, "you are not authenticated!"));
    }

    jwt.verify(token, process.env.token_securityKey, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid"));
        }
        req.user = user;
        next();
    });
}

const verifyUser = (req, resp, next) => {
    verifyToken(req, resp, () => {
        if (req.user.id === req.params._id || req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(403, "you are not authorized"))
        }
    })
}

const verifyAdmin = (req, resp, next) => {
    verifyToken(req, resp, () => {
        console.log(req.user)
        if (req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(403, "you are not admin"))
        }
    })
}

module.exports = {
    verifyToken: verifyToken,
    verifyUser: verifyUser,
    verifyAdmin: verifyAdmin
}
