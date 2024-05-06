const express = require("express");
const hotelController = require("../controller/hotel");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// get all hotels
router.get("/getHotels", hotelController.getHotels);

// get hotel by id
router.get("/getHotel/:hotelId", hotelController.getHotel);

// create a hotel
router.post(
  "/createHotel",
  authMiddleware.isAuthenticatedAdmin,
  hotelController.postHotel
);

router.put(
  "/editHotel/:hotelId",
  authMiddleware.isAuthenticatedAdmin,
  hotelController.editHotel
);

// delete a hotel
router.delete(
  "/deleteHotel",
  authMiddleware.isAuthenticatedAdmin,
  hotelController.deleteHotel
);

router.post("/postHotels", hotelController.postHotels);
router.post("/postHotels/:hotelId", hotelController.postHotelById);

module.exports = router;
