const hotel = require("../models/Hotels.js");
const express = require('express');
// const multer = require('multer');
// const {v4: uuidv4} = require('uui')

// const upload = multer({ dest: 'uploads/' })

//  create Hotel
const creatHotel = async(req, resp, next)=>{
    // const newHotel = new hotel(req.body);
    console.log(req.body)
    console.log(req.files['comfortRoomImages'][0])

    let comfortRoomImagesPath = [];
    // for(let i=0; i<req.files['comfortRoomImages'].length; i++){
    //     comfortRoomImagesPath.push(req.files['comfortRoomImages'][i].path)
    // }

    let deluxeRoomImagesPath = [];
    // for(let i=0; i<req.files['deluxeRoomImages'].length; i++){
    //     deluxeRoomImagesPath.push(req.files['deluxeRoomImages'][i].path)
    // }

    let luxuryRoomImagesPath = [];
    // for(let i=0; i<req.files['luxuryRoomImages'].length; i++){
    //     luxuryRoomImagesPath.push(req.files['luxuryRoomImages'][i].path)
    // }

    let hotelImagesPath = [];
    // for(let i=0; i<req.files['hotelImages'].length; i++){
    //     hotelImagesPath.push(req.files['hotelImages'][i].path)
    // }

    const newHotel = new hotel({
        name: req.body.name,
        type: req.body.type,
        city: req.body.destination,
        tittle: "",
        address: req.body.address,
        description: req.body.description,
        distance: "",
        photos: hotelImagesPath,
        comfort: {
            roomName: req.body.comfortRoomName,
            roomServices: req.body.comfortRoomServices,
            roomImages: comfortRoomImagesPath,
            roomPrice: req.body.comfortRoomPrice,
            roomDescription: req.body.comfortRoomDescription
        },

        deluxe: {
            roomName: req.body.deluxeRoomName,
            roomServices: req.body.deluxeRoomServices,
            roomImages: deluxeRoomImagesPath,
            roomPrice: req.body.deluxeRoomPrice,
            roomDescription: req.body.deluxeRoomDescription
        },

        luxury: {
            roomName: req.body.luxuryRoomName,
            roomServices: req.body.luxuryRoomServices,
            roomImages: luxuryRoomImagesPath,
            roomPrice: req.body.luxuryRoomPrice,
            roomDescription: req.body.luxuryRoomDescription
        },

        cheapestPrice: req.body.startingPrice,
        contact: {
            name: req.body.contactName,
            email: req.body.contactEmail,
            phone1: req.body.contactPhoneNumber1,
            phone2: req.body.contactPhoneNumber2
        },

        socialMedia: {
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            linkedin: req.body.linkedin,
            pintrest: req.body.pintrest
        },

        features: req.body.features,

    })

    try {
        const savedHotel = await newHotel.save();
        resp.status(200).json(savedHotel);
    }
    catch (error) {
        // resp.status(500).json(error);
        next(error);
    }
}


const updateHotel = async(req, resp, next)=>{
    try {
        const updateHotel = await hotel.findByIdAndUpdate(
            req.params._id,
            { $set: req.body },
            { new: true }
        );
        resp.status(200).json(updateHotel);
    }
    catch (error) {
        // resp.status(500).json(error);
        next(error);
    }
}


// delete Hotel
const delteHotel = async(req, resp, next)=>{
    try{
        await hotel.findByIdAndDelete(
            req.params._id
        );

        resp.send("Hotel has been delete");
    }
    catch(error){
        // resp.send(error);
        next(error);
    }
}


// get Hotel
const getHotel = async(req, resp, next)=>{
    try{
        const specificHotel = await hotel.findOne({name: req.params.name});
        resp.status(200).json(specificHotel);
    }
    catch(error){
        // resp.status(500).json(error);
        next(error);
    }
}

const getHotelByHotelId = async(req, resp, next)=>{
    try{
        const specificHotel = await hotel.findOne({_id: req.params._id});
        resp.status(200).json(specificHotel);
    }
    catch(error){
        // resp.status(500).json(error);
        next(error);
    }
}



// // get all hotels
const getAllHotels = async(resp, req, next)=>{
        // console.log("Hi iam a hotel route")
    // const failed = true;
    // if(failed){
    //     return next(createError(401, "you are not authenticated!"));
    // }

    try{
        const allHotels = await hotel.find();
        resp.status(200).json(allHotels);
    }
    catch(error){
        next(error);
    }
}


module.exports = {
    creatHotel: creatHotel,
    updateHotel: updateHotel,
    delteHotel: delteHotel,
    getHotel: getHotel,
    getHotelByHotelId: getHotelByHotelId,
    // getAllHotels: getAllHotels,
}