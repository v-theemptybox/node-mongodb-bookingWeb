const User = require("../models/User");
const bcrypt = require("bcrypt");

// get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// sign up
exports.signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt();

    // if username duplicate with user in db
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // if username is not in user db
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

// sign in
exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // if username is not in user db
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // save user into session
    req.session.user = user;
    req.session.isLoggedIn = true;

    // if username and password is valid

    res.status(200).json(req.session.user);
  } catch (error) {
    console.error("Error in sign in:", error);
    res.status(500).send("Internal Server Error");
  }
};

// get session information
exports.getSessionInfo = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).end();
  }
};

exports.signOut = async (req, res, next) => {
  try {
    // delete(destroy session)
    if (req.session.isLoggedIn) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).send("Sign out successful");
      });
    }
  } catch (error) {
    console.error("Error in sign out:", error);
    res.status(500).send("Internal Server Error");
  }
};
