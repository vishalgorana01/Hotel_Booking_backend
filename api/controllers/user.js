// const { json } = require('express');
const bcrypt = require('bcryptjs');
const express = require('express');
const user = require('../models/Users.js');
const createError = require('../utils/error.js');
const mail = require('../controllers/sendMail.js');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const nodemailer = require('nodemailer')

//find user by email
const findByemail = async (req, resp, next) => {
    // console.log(req.body)
    try {
        const userByemail = await user.findOne({ email: req.body.email })

        if (!userByemail) {
            return next(createError(404, 'user is not found'))
        }

        resp.status(200).json(userByemail)

    } catch (error) {
        next(error)
    }
}

// forgot password 
const findUser = async (req, resp, next) => {
    try {
        console.log(req.body.email)

        // connect with smtp; 
        const transporter = await nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            auth: {
                user: 'hotelio43@outlook.com',
                pass: 'owner_hotelio_43'
            }
        });

        let mailDetails = {
            from: 'hotelio43@outlook.com',
            to: `${req.body.email}`,
            subject: 'Reset Password',
            text: `Click on the below to Reset Your Password :- 
        https://hotel-booking-frontend-zeta.vercel.app/ResetPassword/?id=${req.body.Reset_id}`,
        };

        transporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log(err);
                resp.status(500).json(err);
            } else {
                console.log('Email sent successfully');
                resp.status(200).send("email is successfully sended");
            }
        });
    } catch (error) {
        next(error)
    }
}

// Update user
const updateUser = async (req, resp, next) => {
    console.log(req.params._id)
    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(req.body.password, saltRounds);

        const updatedUser = await user.findOneAndUpdate(
            { _id: req.params._id },
            { $set: { password: hashed } },
            { new: true }
        );
        resp.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// Delete user
const deleteUser = async (req, resp, next) => {
    try {
        await user.findByIdAndDelete(req.params._id);
        resp.status(200).send("user has been deleted");
    } catch (error) {
        next(error)
    }
}

// Get User
const getUser = async (req, resp, next) => {
    try {
        const getLoggedInUser = await user.findById(req.params._id);
        resp.status(200).json(getLoggedInUser)
        // console.log(req.params)
    } catch (error) {
        next(error)
    }
}

// Get all user
const getAllUser = async (req, resp, next) => {
    console.log("get all users from database")
    try {
        const getAll = await user.find();
        resp.status(200).json(getAll);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser,
    getAllUser: getAllUser,
    findUser: findUser,
    findByemail: findByemail,
}