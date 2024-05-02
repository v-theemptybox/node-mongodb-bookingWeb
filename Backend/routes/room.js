const express = require("express");
const roomController = require("../controller/room");

const router = express.Router();

// get all hotel
router.get("/getRooms", roomController.getRooms);

// create room
router.post("/createRoom", roomController.postRoom);

// delete room
router.delete("/deleteRoom", roomController.deleteRoom);

module.exports = router;
