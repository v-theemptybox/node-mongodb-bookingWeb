const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
// body parser to json
app.use(express.json());

// handling non matching request from the client
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// server setup
mongoose
  .connect(
    "mongodb+srv://vinhnvlfx23170:51gseFhFrmQaXf7v@cluster0.wriqswp.mongodb.net/booking?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDb Connected!");
    app.listen(5000, () => {
      console.log("Start the server!");
    });
  });
