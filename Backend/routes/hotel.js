const express = require("express");
const hotelController = require("../controller/hotel");

const router = express.Router();

router.post("/postHotels", hotelController.postHotels);
router.post("/postHotels/:hotelId", hotelController.postHotelById);

module.exports = router;
