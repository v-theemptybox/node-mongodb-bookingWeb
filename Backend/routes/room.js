const express = require("express");
const roomController = require("../controller/room");

const router = express.Router();

// get all hotel
router.get("/getRooms", roomController.getRooms);

module.exports = router;
