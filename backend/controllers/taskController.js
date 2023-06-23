const Task = require("../models/taskModel");

//Create New task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get all Task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get a Task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json(`No task with id: ${id} found.`);
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json(`No task with id: ${id} found.`);
    res.status(200).json(`Task id: ${id} deleted.`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json(`No task with id: ${id} found.`);

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, getTasks, getTask, deleteTask, updateTask };
