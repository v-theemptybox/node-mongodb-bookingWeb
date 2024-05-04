const express = require("express");
const roomController = require("../controller/room");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// get all hotel
router.get("/getRooms", roomController.getRooms);

// create room
router.post(
  "/createRoom",
  authMiddleware.isAuthenticated,
  roomController.postRoom
);

// delete room
router.delete("/deleteRoom", roomController.deleteRoom);

module.exports = router;
