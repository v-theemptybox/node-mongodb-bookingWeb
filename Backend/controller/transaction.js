const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Hotel = require("../models/Hotel");

const paging = require("../utils/paging");
const PAGE_SIZE = 8;

// get report info
exports.getReports = async (req, res, next) => {
  try {
    const userAmount = await User.countDocuments();
    const transactionAmount = await Transaction.countDocuments();
    const transactionTotalAmount = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$price" },
        },
      },
    ]);
    const monthlyAveragePriceAggregate = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: "$dateStart" },
          totalPrice: { $sum: "$price" },
          count: { $sum: 1 }, // count documents amount on each group
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          averagePrice: { $divide: ["$totalPrice", "$count"] }, // average
        },
      },
    ]);

    const results = [
      userAmount || 0,
      transactionAmount || 0,
      transactionTotalAmount[0].totalPrice || 0,
      monthlyAveragePriceAggregate[monthlyAveragePriceAggregate.length - 1]
        .averagePrice || 0,
    ];

    res.status(200).json({
      results,
    });
  } catch (error) {
    console.log(error);
  }
};

// create transaction
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

    const page = +req.query.page || 1;
    const results = paging(transactions, PAGE_SIZE, page);

    res.status(200).json({
      results,
      page,
      totalPages: Math.ceil(transactions.length / PAGE_SIZE),
    });
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
