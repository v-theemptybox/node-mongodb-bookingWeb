const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();

    // if username duplicate with user in db
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    // if username is not in user db
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // if username is not in user db
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }

    // save user into session
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    // if username and password is valid
    res.status(200).send(req.session.user.username);
  } catch (error) {
    console.error("Error in sign in:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.signOut = async (req, res, next) => {
  try {
    // delete(destroy session)
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).send("Sign out successful");
    });
  } catch (error) {
    console.error("Error in sign out:", error);
    res.status(500).send("Internal Server Error");
  }
};
