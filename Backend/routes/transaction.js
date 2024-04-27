const express = require("express");
const transactionController = require("../controller/transaction");

const router = express.Router();

// create transaction
router.post("/postTransaction", transactionController.postTransaction);
// get transaction by id
router.post("/postTransactionById", transactionController.postTransactionById);
// get all transactions
router.get("/getTransactions", transactionController.getTransactions);

module.exports = router;
