const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Hotel = require("../models/Hotel");

exports.postTransaction = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.user });

    const newTransaction = new Transaction({
      ...req.body,
      user: user._id,
    });
    await newTransaction.save();
    res.status(201).send("Transaction created");
  } catch (err) {
    console.log(err);
  }
};

// get all transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("user")
      .populate("hotel");
    res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
  }
};

exports.postTransactionById = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.user });

    const transaction = await Transaction.find({ user: user._id }).populate(
      "hotel"
    );
    res.status(201).json(transaction);
  } catch (err) {
    console.log(err);
  }
};
