const bcrypt = require('bcryptjs');
const User = require("../models/Users.js");
const createError = require('../utils/error.js');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res, next) => {
    try {
        const saltRounds = 10;
        // const hash = `s0/\/\${req.body.password}`;
        const hashed = await bcrypt.hash(req.body.password, saltRounds);
        // const someOtherPlaintextPassword = 'not_bacon';

        console.log(req.body)
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.userEmail,
            password: hashed,
        })

        // console.log(req.body)
        await newUser.save();
        res.status(200).send("User has been created");
    }
    catch (error) {
        next(error)
    }
}

const login = async (req, resp, next) => {
    try {
        console.log(req.body)
        const loginByUserName = await User.findOne({ userName: req.body.userName_Email });
        const loginByEmail = await User.findOne({ email: req.body.userName_Email });
        console.log(loginByEmail);
        console.log(loginByUserName);

        if (!loginByUserName && !loginByEmail) {
            return next(createError(404, "User not found"));
            // res.status(200).send("User has been created");
        }
        else if (loginByUserName) {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, loginByUserName.password);
            if (!isPasswordCorrect) {
                return next(createError(400, "Wrong Password"));
            }

            const token = jwt.sign({ id: loginByUserName._id, isAdmin: loginByUserName.isAdmin }, process.env.token_securityKey);

            const { password, isAdmin, ...otherDetails } = loginByUserName._doc
            resp.cookie("acces_token", token, {
                httpOnly: true
            }).status(200).json({ isAdmin: isAdmin, ...otherDetails });
        }
        else if (loginByEmail) {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, loginByEmail.password);
            if (!isPasswordCorrect) {
                return next(createError(400, "Wrong Password"));
            }

            const token = jwt.sign({ id: loginByEmail._id, isAdmin: loginByEmail.isAdmin }, process.env.token_securityKey);

            const { password, isAdmin, ...otherDetails } = loginByEmail._doc
            resp.cookie("acces_token", token, {
                httpOnly: true
            }).status(200).json({isAdmin: isAdmin, ...otherDetails });
        }
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    register: register,
    login: login,
}