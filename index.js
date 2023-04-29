const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require('body-parser')
const {mongoose} = require("mongoose");

const authRoute = require("./api/routes/auth.js");
const usersRoute = require("./api/routes/users.js");
const hotelsRoute = require("./api/routes/hotels.js");
const roomsRoute = require("./api/routes/rooms.js");
const requestsRoute = require("./api/routes/requests.js")

dotenv.config();
app.use(cookieParser());

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json())

mongoose.set('strictQuery', true);
const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongoDB");
    }catch(error){
        console.log(error)
        throw error;
    }
}

// connect to MongoDb
connect();

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected!");
})

mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected!");
})


// middlewares
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/requests", requestsRoute);

app.use((error,req,res,next)=>{
    console.log("Hey, iam middle ware");
    // next()
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!"
    return res.status(errorStatus).json(
        {
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: error.stack
        }
    );
})

app.listen(8800, ()=>{
    // connect();
    console.log("connected to backened");
});