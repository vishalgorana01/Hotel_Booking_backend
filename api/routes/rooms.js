const express = require("express");

const router = express.Router();

router.get("/", (req,resp)=>{
    resp.send("Hello, this is rooms endpoint")
});

module.exports = router;