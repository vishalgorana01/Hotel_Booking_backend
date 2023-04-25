const mongoose  = require('mongoose');

const Schema = mongoose.Schema();

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: true
    },
    type:{
        type:String,
        // required:true
    },
    city:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        // required:true
    },
    tittle:{
        type:String,
        // required:true
    },
    distance:{
        type:String,
        // required:true
    },
    photos:{
        type:[String],
    },
    description:{
        type: String,
        // required: true
    },
    rating:{
        type: Number,
        // required: true,
        min: 0,
        max: 10
    },
    comfort:{
        type: Object
    },
    deluxe:{
        type: Object
    },
    luxury:{
        type: Object
    },
    cheapestPrice:{
        type:Number,
        // required: true
    },
    features:{
        type: [String],
        // default: false
    },
    contact: {
        type: Object
    },
    socialMedia: {
        type: Object
    }
});

module.exports = mongoose.model("Hotel", HotelSchema);