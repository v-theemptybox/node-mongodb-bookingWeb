const express = require("express");
const hotelController = require("../controller/hotel");

const router = express.Router();

// get all hotel
router.get("/getHotels", hotelController.getHotels);

// create a hotel
router.post("/createHotel", hotelController.postHotel);

router.post("/postHotels", hotelController.postHotels);
router.post("/postHotels/:hotelId", hotelController.postHotelById);

module.exports = router;
