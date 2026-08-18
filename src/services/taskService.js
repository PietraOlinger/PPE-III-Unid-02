import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

const getTasks = async (userId) => {
  return Task.find({ userId }).sort({ createdAt: -1 });
};

const createTask = async ({ title, done, userId }) => {
  const task = new Task({ title, done, userId });
  return task.save();
};

const updateTask = async (id, userId, data) => {
  const task = await Task.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true
  });
  if (!task) throw new AppError("Tarefa não encontrada", 404);
  return task;
};

const deleteTask = async (id, userId) => {
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) throw new AppError("Tarefa não encontrada", 404);
  return task;
};

export default { getTasks, createTask, updateTask, deleteTask };
