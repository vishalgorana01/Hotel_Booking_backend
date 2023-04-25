const mongoose = require('mongoose');
const { schema } = require('./Users');
const Schema = mongoose.Schema();

const requestsSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    hotelName:{
        type: String,
        require: true,
    },
    roomName: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    no_rooms: {
        type: Array,
        require: true
    },
    booking_id:{
        type: String,
        require: true
    },
    uid: {
        type: String,
        require: true
    },
    hotel_id: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone1: {
        type: Number,
    },
    phone2: {
        type: Number,
    },
    transaction_status: {
        type: String,
    },
},
{timestamps: true}
)

module.exports = mongoose.model('Requests', requestsSchema);