const Room = require("../models/Room");

// Get all rooms
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.log(err);
  }
};
