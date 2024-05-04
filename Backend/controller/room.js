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
    console.log(room);
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
