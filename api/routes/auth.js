const express = require("express");
const auth = require("../controllers/auth.js")

const router = express.Router();

router.post("/register",auth.register);
router.post("/login", auth.login);

// router.get("/register",(req,resp)=>{
//     resp.send("Hello this is register endpoint");
// })

module.exports = router;