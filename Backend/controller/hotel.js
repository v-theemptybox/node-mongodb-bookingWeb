const { ObjectId } = require("mongodb");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room"); // must be import to use populate!!!
const Transaction = require("../models/Transaction");

const paging = require("../utils/paging");
const PAGE_SIZE = 8;

// Get all hotels
exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    const page = +req.query.page || 1;
    const results = paging(hotels, PAGE_SIZE, page);

    res.status(200).json({
      results,
      page,
      totalPages: Math.ceil(hotels.length / PAGE_SIZE),
    });
  } catch (error) {
    console.log(err);
  }
};

// get hotel by id
exports.getHotel = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findOne({ _id: hotelId });
    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
  }
};

// create hotel
exports.postHotel = async (req, res, next) => {
  try {
    const hotel = new Hotel({
      name: req.body.name,
      city: req.body.city,
      address: req.body.address,
      desc: req.body.desc,
      distance: +req.body.distance,
      cheapestPrice: +req.body.cheapestPrice,
      featured: req.body.featured,
      photos: req.body.photos,
      rooms: req.body.rooms,
      title: req.body.title,
      type: req.body.type,
      rating: +req.body.rating,
    });

    await hotel.save();
    res.status(201).send("Hotel created!");
  } catch (error) {
    console.log(error);
  }
};

// delete hotel
exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.body.hotelId);

    const transaction = await Transaction.find({ hotel });

    // if has no transaction or transaction array is empty then delete hotel
    if (!transaction || transaction.length === 0) {
      await Hotel.deleteOne({ _id: hotel });
      res.status(204).send("Deleted!");
    } else {
      res.status(405).send("Delete fail!");
    }
  } catch (error) {
    console.log(error);
  }
};

// edit hotel
exports.editHotel = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const updatedFields = req.body;

    // check hotelId and updatedFields existence
    if (!hotelId || Object.keys(updatedFields).length === 0) {
      res.status(400).send("Invalid request data");
      return;
    }

    // update hotelId in db
    const hotel = await Hotel.findByIdAndUpdate(hotelId, updatedFields, {
      new: true, // if true, return the modified document rather than the original
    });

    // check if any rooms are successfully updated
    if (!hotel) {
      res.status(404).send("Hotel not found");
      return;
    }

    // returns updated room information
    res.status(200).send("Updated!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get hotels by filter condition for homepage(client)
exports.postHotels = async (req, res, next) => {
  try {
    const { cities, type, top3Rating } = req.body;

    // by default will get entire hotel list
    if (!cities && !type && !top3Rating) {
      return res.status(200).json(await Hotel.find());
    }

    if (cities && Array.isArray(cities)) {
      const hotelNumbers = [];

      for (const cityName of cities) {
        const count = await Hotel.countDocuments({ city: cityName });
        hotelNumbers.push(count);
      }
      return res.status(200).json(hotelNumbers);
    }

    // get city amount by cities type
    if (type) {
      const hotelNumbers = [];
      for (const t of type) {
        const count = await Hotel.countDocuments({ type: t });
        hotelNumbers.push(count);
      }
      return res.status(200).json(hotelNumbers);
    }

    // get top 3 city by rating
    if (top3Rating) {
      const topHotels = await Hotel.find()
        .sort({ rating: -1 })
        .limit(top3Rating);
      return res.status(200).json(topHotels);
    }

    // get city amount by cities name
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get hotel by id
exports.postHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId).populate("rooms");
    const { startDate, endDate } = req.body;

    const reqSDate = new Date(startDate);
    const reqEDate = new Date(endDate);

    // find transaction for hotel
    const transactions = await Transaction.find({
      hotel,
    });

    const conflictTransactions = [];

    transactions.forEach((transaction) => {
      const tSDate = new Date(transaction.dateStart);
      const tEDate = new Date(transaction.dateEnd);

      // format time to 00:00:00:00
      const formatDate = (date) => new Date(date.setHours(0, 0, 0, 0));
      formatDate(tSDate);
      formatDate(tEDate);
      formatDate(reqSDate);
      formatDate(reqEDate);

      const sDateConflict = tSDate <= reqSDate && reqEDate <= tEDate;
      const eDateConflict = tSDate <= reqEDate && reqEDate <= tEDate;
      const sContainDateConflict = tSDate >= reqSDate && reqEDate >= tSDate;
      const eContainDateConflict = tEDate >= reqSDate && reqEDate >= tEDate;

      if (
        sDateConflict ||
        eDateConflict ||
        sContainDateConflict ||
        eContainDateConflict
      )
        // if there are any conflict dates, they will be added to the conflictTransactions array
        return conflictTransactions.push(transaction);
    });

    // get room numbers from conflict transaction
    const bookedRoomNumbers = conflictTransactions
      .map((transaction) => transaction.room.map((room) => room.roomNumber))
      .flat();

    const availableRooms = hotel.rooms.map((hRoom) => {
      // filter room that are booked
      const filteredRoomNumbers = hRoom.roomNumbers.filter(
        (number) => !bookedRoomNumbers.includes(number)
      );
      return { ...hRoom.toJSON(), roomNumbers: filteredRoomNumbers };
    });

    // create a new hotel with available rooms
    const hotelWithAvailableRooms = {
      ...hotel.toJSON(),
      rooms: availableRooms,
    };

    res.status(200).json(hotelWithAvailableRooms);
  } catch (err) {
    console.log(err);
  }
};

exports.searchHotels = async (req, res, next) => {
  try {
    // by default maxPeople = 1, cities =[""], startDate and endDate = today;
    const { cities, startDate, endDate, maxPeople, roomNo } = req.body;

    // get hotels by max people of room
    let queryCity = {};
    if (!cities.includes("") && cities.length === 1) {
      queryCity.city = cities[0];
    }

    const hotels = await Hotel.find(queryCity).populate({
      path: "rooms",
      // if room have max people >= maxPeople
      match: { maxPeople: { $gte: maxPeople } },
    });

    // filter hotels by maxPeople, roomNo(room number) and city name
    const filteredHotels = hotels.filter(
      (hotel) => hotel.rooms.length >= roomNo
    );

    // find conflict transactions
    const transactions = await Transaction.find({
      $or: [
        { dateStart: { $gte: startDate, $lte: endDate } },
        { dateEnd: { $gte: startDate, $lte: endDate } },
      ],
      hotel: filteredHotels,
    });
    // if there is no conflicted transaction
    if (!transactions || transactions.length === 0) {
      res.status(200).json(filteredHotels);
    } else {
      // get all hotelIds in transactions
      const hotelIdsInTransactions = transactions.map(
        (transaction) => transaction.hotel
      );

      // find hotels in transactions
      //============ NOTE: MONGOOSE AUTOMATICALLY DETECTS DUPLICATE IDS AND WILL NOT FIND DUPLICATE IDS
      const hotelsInTransactions = await Hotel.find({
        _id: hotelIdsInTransactions,
      }).populate("rooms");
      let roomObj = {};
      transactions.forEach((transaction) => {
        transaction.room.forEach((room) => {
          if (!roomObj[room.roomId]) {
            // if roomId does not exist, create a new room
            roomObj[room.roomId] = {
              roomId: room.roomId,
              roomNumbers: [room.roomNumber],
            };
          } else {
            // if roomId already exists, just add roomNumber to the roomNumbers array
            roomObj[room.roomId].roomNumbers.push(room.roomNumber);
          }
        });
      });
      // convert roomObj to room array
      let roomArr = Object.values(roomObj);
      const conflictedRoomsInfo = [];
      hotelsInTransactions.forEach((hotel) => {
        hotel.rooms.forEach((room) => {
          roomArr.forEach((arrRoom) => {
            // if room._id = roomId of roomArr then continue check roomNumbers
            if (room._id.toString() === arrRoom.roomId) {
              if (
                // if roomNumbers of room = roomNumbers roomArr
                JSON.stringify(room.roomNumbers.sort()) ===
                JSON.stringify(arrRoom.roomNumbers.sort())
              ) {
                // if both conditions are true, add that conflict room information (hotelId) to the conflictedRooms array.
                conflictedRoomsInfo.push(hotel._id);
              }
            }
          });
        });
      });

      if (!cities.includes("") && cities.length === 1) {
        const newFilteredHotels = await Hotel.find({
          _id: { $nin: conflictedRoomsInfo },
          city: cities[0],
        });
        res.status(200).json(newFilteredHotels);
      } else {
        const newFilteredHotels = await Hotel.find({
          _id: { $nin: conflictedRoomsInfo },
        });
        res.status(200).json(newFilteredHotels);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
