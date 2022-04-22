const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

module.exports = {
  getGoals: asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  }),

  setGoals: asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400);
      throw new Error("please add a text field");
    }

    const goal = await Goal.create({
      text: req.body.text,
      user: req.user._id,
    });

    console.log(goal);

    res.json(goal);
  }),

  updateGoal: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(401);
      throw new Error("user not found");
    }

    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("user not authorized p");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedGoal);
  }),

  deleteGoal: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(401);
      throw new Error("user not found");
    }

    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("user not authorized");
    }

    await goal.remove();
    res.json({ message: `delete goal ${req.params.id}` });
  }),
};
