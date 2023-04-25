const express = require('express')
const requests = require('../controllers/requests.js')
const router = express.Router();

router.post('/send', requests.send);
router.get('/receivedAll', requests.received)
router.get('/receivedOne/:_id', requests.receivedOne);
router.put('/updateRequest/:_id', requests.updateRequest);
router.get('/userRequests/:username', requests.receivedAllRequestsByUserName)

module.exports = router