// const { json } = require('express');
const express = require('express');
const user = require('../models/Users.js');

// Update user
const updateUser = async(req, resp, next)=>{
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params._id,
            {$set: req.body},
            {new: true}
        );
        resp.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// Delete user
const deleteUser = async(req, resp, next)=>{
    try {
        await user.findByIdAndDelete(req.params._id);
        resp.status(200).send("user has been deleted");
    } catch (error) {
        next(error)
    }
}

// Get User
const getUser = async(req, resp, next)=>{
    try {
        const getLoggedInUser = await user.findById(req.params._id);
        resp.status(200).json(getLoggedInUser) 
        // console.log(req.params)
    } catch (error) {
        next(error)
    }
}

// Get all user
const getAllUser = async(req, resp, next)=>{
    console.log("get all users")
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
}