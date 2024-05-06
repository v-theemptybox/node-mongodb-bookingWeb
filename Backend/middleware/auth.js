exports.isAuthenticated = async (req, res, next) => {
  // Check if the user is logged in
  if (req.session && req.session.isLoggedIn) {
    next();
  } else {
    // If the user is not logged in, return 401 error (Unauthorized)
    res.status(401).send("You need to log in to access this resource");
  }
};

exports.isAuthenticatedAdmin = (req, res, next) => {
  // Check if the admin user is logged in
  if (req.session && req.session.user.isAdmin) {
    next();
  } else {
    // If the user is not logged in, return 401 error (Unauthorized)
    res
      .status(401)
      .send(
        "You need to log in with an administrator account to access this resource"
      );
  }
};
