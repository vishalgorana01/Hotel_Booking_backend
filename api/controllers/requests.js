const { json } = require('body-parser');
const requestsSchema = require('../models/Requests.js')
const createError = require('../utils/error.js')
const dotenv = require("dotenv");

dotenv.config();

const sendRequests = async (req, resp, next)=>{
    console.log(req.body);
    // const str = JSON.stringify(req.body.startDate)
    // console.log(JSON.parse(str)[0])
    try {
        const newRequests = new requestsSchema({
            userName: req.body.userName,
            status: req.body.status,
            message: req.body.message,
            hotelName: req.body.hotelName,
            roomName: req.body.roomName,
            price: req.body.price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            no_rooms: req.body.no_rooms,
            booking_id: req.body.booking_id,
            hotel_id: req.body.hotel_id,
        })

        await newRequests.save()
        resp.status(200).json(newRequests._id);
    } catch (error) {
        next(error);
    }
}

const receivedAllRequestsByName = async (req, resp, next)=>{
    try {
        const UserRequests = await requestsSchema.find(
            {userName: req.params.username}
        );

        resp.status(200).json(UserRequests);
    } catch (error) {
        next(error)
    }
}

const receivedAllRequests = async (req, resp, next)=>{
    try {
        const allRequests = await requestsSchema.find();
        resp.status(200).json(allRequests);
    } catch (error) {
        next(error)
    }
}

const receivedOneRequest = async (req, resp, next)=> {
    try {
        const currentRequest = await requestsSchema.findOne({_id: req.params._id})
        resp.status(200).json(currentRequest);
    } catch (error) {
        next(error)
    }
}

const updateRequest = async(req, resp, next)=>{
    console.log(req.body)
    try {
        const updatedRequest = await requestsSchema.findByIdAndUpdate(
            req.params._id,
            {$set: req.body},
            {new: true}
        )
        resp.status(200).json(updatedRequest)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    send: sendRequests,
    received: receivedAllRequests,
    receivedOne: receivedOneRequest,
    updateRequest: updateRequest,
    receivedAllRequestsByUserName: receivedAllRequestsByName
}