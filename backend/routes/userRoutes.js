const express = require("express");
const GetUsers = require("../controllers/GetUsers");
const {
  loginController,
  registerController,
  authController,
  getAllNotificationController,
} = require("../controllers/userCtrl");

const authMiddleware = require("../middlewares/authMiddleware");

//router obj
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST

router.post("/getUserData", authMiddleware, authController);

router.get("/users", GetUsers.getAllUsers);
router.get("/users/:role", GetUsers.getUsersByRole);

module.exports = router;
