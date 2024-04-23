const express = require("express");
const hotelController = require("../controller/hotel");

const router = express.Router();

router.post("/postHotels", hotelController.postHotels);
router.get("/getHotels/:hotelId", hotelController.getHotelById);

module.exports = router;
