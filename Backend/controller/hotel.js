const Hotel = require("../models/Hotel");
const Room = require("../models/Room"); // must be import to use populate!!!

exports.postHotels = async (req, res, next) => {
  try {
    const { cities, type, top3Rating } = req.body;

    // by default will get entire hotel list
    if (!cities && !type && !top3Rating) {
      return res.status(200).json(await Hotel.find());
    }

    // get city amount by cities name
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(await Hotel.findById(req.params.hotelId).populate("rooms"));
  } catch (err) {
    console.log(err);
  }
};
