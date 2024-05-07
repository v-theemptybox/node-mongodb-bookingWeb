const express = require("express");
const transactionController = require("../controller/transaction");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// get reports
router.get("/getReports", transactionController.getReports);

// create transaction
router.post("/postTransaction", transactionController.postTransaction);
// get transaction by id
router.post("/postTransactionById", transactionController.postTransactionById);
// get all transactions
router.get("/getTransactions", transactionController.getTransactions);

module.exports = router;
