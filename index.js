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
app.use(cors({}));
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))
mongoose.set('strictQuery', true);

const connect = async ()=>{
    try{
        console.log(process.env.mongo1)
        await mongoose.connect(process.env.mongo1)
        console.log("Connected to mongoDB");
    }catch(error){
        console.log(error)
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected!");
})

mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected!");
})


// middlewares
app.use(express.json());
// app.post("/register", (req,rsp)=>{
//     // rsp.send("<h1>auth</h1>")
//     console.log(req.body);
// })
app.use('/', (req,resp)=>{
    resp.send("hello welcome")
})
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
    connect();
    console.log("connected to backened");
});