const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.post("/signOut", userController.signOut);

module.exports = router;
