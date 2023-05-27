const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

router.get("/getuser", protect, userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
