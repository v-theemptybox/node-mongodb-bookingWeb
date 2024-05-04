exports.isAuthenticated = (req, res, next) => {
  // Check if the user is logged in
  console.log(req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    // If the user is not logged in, return 401 error (Unauthorized)
    res.status(401).send("You need to log in to access this resource");
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
