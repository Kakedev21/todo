const Todo = require("../models/todo.model");
const asyncHandler = require("express-async-handler");

const getTodo = asyncHandler(async (req, res) => {
  const myTodo = await Todo.find({ user: req.user._id });
  req.status(200).json(myTodo);
});

const createTodo = asyncHandler(async (req, res) => {
  const todo = req.body.text;

  const newTodo = await Todo.create({
    todo,
    user: req.user._id,
  });
  res.status(200).json(newTodo);
});

module.exports = {
  createTodo,
  getTodo,
};
