const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const transactionRoutes = require("./routes/transaction");

const app = express();

app.use(cors({ credentials: true }));
// body parser to json
app.use(bodyParser.json());

// Use the session middleware
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// handling non matching request from the client
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.use("/user", authRoutes);
app.use("/api", hotelRoutes);
app.use("/api", transactionRoutes);

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
