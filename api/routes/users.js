const express = require("express");
const user = require('../controllers/user.js');
const verify = require("../utils/verifyToken.js");
const router = express.Router();
const User = require("../models/Users.js")

// router.get("/", (req,resp)=>{
//     resp.send("Hello, this is users endpoint");
// })

//  verifications
// router.get("/checkauthentication", verify.verifyToken, async (req, resp, next)=>{
//     resp.status(200).send("hello user, you are logged in");
// })

// router.get("/checkuser/:id", verify.verifyUser, (req, resp, next)=>{
//     resp.send("hello user, you are able to do")
// })

// router.get("/checkAdmin", verify.verifyAdmin, (req, resp, next)=>{
//     resp.send("hello admin, you are able to do")
// })

// update user
router.put('/:_id', verify.verifyUser, user.updateUser);

// delete user
router.delete('/:_id', verify.verifyUser, user.deleteUser);

// get user
router.get('/:_id', user.getUser);

// get all user
router.get('/', async(req, resp, next)=>{
    console.log("get all users from database")
    try {
        const getAll = await User.find();
        resp.status(200).json(getAll);
    } catch (error) {
        next(error);
    }
});

module.exports = router;