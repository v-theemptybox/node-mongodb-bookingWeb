const express = require("express");
const transactionController = require("../controller/transaction");

const router = express.Router();

router.post("/postTransaction", transactionController.postTransaction);
router.post("/postTransactionById", transactionController.postTransactionById);

module.exports = router;
