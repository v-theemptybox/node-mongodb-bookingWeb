const express = require("express");
const hotelController = require("../controller/hotel");

const router = express.Router();

router.get("/getHotels", hotelController.getHotels);

module.exports = router;
