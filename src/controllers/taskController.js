import mongoose from "mongoose";
import taskService from "../services/taskService.js";
import AppError from "../utils/AppError.js";

function validateId(id) {
  if (!mongoose.isValidObjectId(id)) throw new AppError("Identificador inválido", 400);
}

export async function list(req, res) {
  res.status(200).json(await taskService.getTasks(req.userId));
}

export async function create(req, res) {
  const { title, done } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    throw new AppError("O título é obrigatório", 400);
  }
  if (done !== undefined && typeof done !== "boolean") {
    throw new AppError("O campo done deve ser booleano", 400);
  }
  const task = await taskService.createTask({ title: title.trim(), done, userId: req.userId });
  res.status(201).json(task);
}

export async function update(req, res) {
  validateId(req.params.id);
  const { title, done } = req.body;
  if (title === undefined && done === undefined) {
    throw new AppError("Informe title ou done para atualizar", 400);
  }
  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    throw new AppError("O título deve ser um texto não vazio", 400);
  }
  if (done !== undefined && typeof done !== "boolean") {
    throw new AppError("O campo done deve ser booleano", 400);
  }
  const data = { ...(title === undefined ? {} : { title: title.trim() }), ...(done === undefined ? {} : { done }) };
  res.status(200).json(await taskService.updateTask(req.params.id, req.userId, data));
}

export async function remove(req, res) {
  validateId(req.params.id);
  await taskService.deleteTask(req.params.id, req.userId);
  res.status(204).send();
}