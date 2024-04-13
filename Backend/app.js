const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
// body parser to json
app.use(express.json());

// handling non matching request from the client
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// server setup
app.listen(5000, () => {
  console.log("Start the server!");
});
