const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  // Check if the user is logged in
  console.log(req.session);
  console.log(req.session.user);
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    // If the user is not logged in, return 401 error (Unauthorized)
    res.status(401).send("You need to log in to access this resource");
  }
};

exports.getSessionInfo = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).end();
  }
};

exports.isAuthenticatedAdmin = (req, res, next) => {
  // Check if the user is logged in
  console.log(req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    // If the user is not logged in, return 401 error (Unauthorized)
    res.status(401).send("You need to log in to access this resource");
  }
};
