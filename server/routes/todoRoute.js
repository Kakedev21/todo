const todoController = require("../controllers/todo.controller");
const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

router.get("/mytodo", protect, todoController.createTodo);
router.post("/createtodo", protect, todoController.createTodo);

module.exports = router;
