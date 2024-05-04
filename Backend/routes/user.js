const express = require("express");
const userController = require("../controller/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// get users
router.get("/getUsers", userController.getUsers);

// get session information
router.get("/session", userController.getSessionInfo);

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.post("/signOut", userController.signOut);

module.exports = router;
