const express = require("express");
const constrollers = require("../controllers/hotel.js");
const hotel = require("../models/Hotels.js");
const createError  = require("../utils/error.js");
const verify = require("../utils/verifyToken.js");

const router = express.Router();
const multer = require('multer')

const upload = multer({ dest: '/tmp' })

const cpUpload = upload.fields([{ name: 'comfortRoomImages', maxCount: 12 }, { name: 'deluxeRoomImages', maxCount: 12 }, { name: 'luxuryRoomImages', maxCount: 12 }, { name: 'hotelImages', maxCount: 12 }])

// create
// router.post("/",verify.verifyAdmin, constrollers.creatHotel);
router.post("/", cpUpload, constrollers.creatHotel);


// update
router.put("/:_id",verify.verifyAdmin, constrollers.updateHotel)

// delete
router.delete("/:_id",verify.verifyAdmin, constrollers.delteHotel);

// get
router.get("/:name", constrollers.getHotel)
router.get("/byId/:_id", constrollers.getHotelByHotelId)


// get all
router.get("/", async(req, resp, next)=>{
    // console.log("Hi iam a hotel route")
    // const failed = true;
    // if(failed){
    //     return next(createError(401, "you are not authenticated!"));
    // }

    try{
        // console.log("send")
        const allHotels = await hotel.find();
        resp.status(200).json(allHotels);
    }
    catch(error){
        next(error);
    }
})

// router.get("/", (req, resp) => {
//     resp.send("Hello, this is hotels endpoint");
// })

module.exports = router;