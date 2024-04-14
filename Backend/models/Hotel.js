const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  rooms: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
