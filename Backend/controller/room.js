const Room = require("../models/Room");
const Transaction = require("../models/Transaction");
const Hotel = require("../models/Hotel");

const paging = require("../utils/paging");
const PAGE_SIZE = 8;

// Get all rooms
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    const page = +req.query.page || 1;
    const results = paging(rooms, PAGE_SIZE, page);

    res.status(200).json({
      rooms,
      results,
      page,
      totalPages: Math.ceil(rooms.length / PAGE_SIZE),
    });
  } catch (error) {
    console.log(err);
  }
};

// get room
exports.getRoom = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findOne({ _id: roomId });
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
  }
};

// Create room
exports.postRoom = async (req, res, next) => {
  try {
    const room = new Room({
      title: req.body.title,
      desc: req.body.desc,
      price: +req.body.price,
      maxPeople: +req.body.maxPeople,
      roomNumbers: req.body.roomNumbers,
    });
    await room.save();
    res.status(201).send("Room created!");
  } catch (error) {
    console.log(error);
  }
};

// Delete room
exports.deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.body.roomId;
    const transaction = await Transaction.find({
      "room.roomId": roomId,
    });
    const hotel = await Hotel.find({ rooms: roomId });

    if (
      (!transaction || transaction.length === 0) &&
      (!hotel || hotel.length === 0)
    ) {
      await Room.deleteOne({ _id: roomId });
      res.status(204).send("Deleted!");
    } else {
      res.status(405).send("Delete fail!");
    }
  } catch (error) {
    console.log(error);
  }
};

// Edit room
exports.editRoom = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const updatedFields = req.body;

    // check roomId and updatedFields existence
    if (!roomId || Object.keys(updatedFields).length === 0) {
      res.status(400).send("Invalid request data");
      return;
    }

    // update room in db
    const room = await Room.findByIdAndUpdate(roomId, updatedFields, {
      new: true, // if true, return the modified document rather than the original
    });

    // check if any rooms are successfully updated
    if (!room) {
      res.status(404).send("Room not found");
      return;
    }

    // returns updated room information
    res.status(200).send("Updated!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
