const express = require("express");
const roomController = require("../controller/room");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// get all room
router.get("/getRooms", roomController.getRooms);

// get room
router.get("/getRoom/:roomId", roomController.getRoom);

// edit room
router.put(
  "/editRoom/:roomId",
  authMiddleware.isAuthenticatedAdmin,
  roomController.editRoom
);

// create room
router.post(
  "/createRoom",
  authMiddleware.isAuthenticatedAdmin,
  roomController.postRoom
);

// delete room
router.delete(
  "/deleteRoom",
  authMiddleware.isAuthenticatedAdmin,
  roomController.deleteRoom
);

module.exports = router;
