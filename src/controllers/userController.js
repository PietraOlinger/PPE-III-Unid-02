import userService from "../services/userService.js";
import AppError from "../utils/AppError.js";

const validateCredentials = ({ name, email, password }, isRegistration = false) => {
  if (isRegistration && (!name || typeof name !== "string" || name.trim().length < 2)) {
    throw new AppError("Nome deve ter pelo menos 2 caracteres", 400);
  }
  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new AppError("E-mail inválido", 400);
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    throw new AppError("A senha deve ter pelo menos 6 caracteres", 400);
  }
};

export async function register(req, res) {
  validateCredentials(req.body, true);
  const user = await userService.register(req.body);
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
}

export async function login(req, res) {
  validateCredentials(req.body);
  const token = await userService.login(req.body);
  res.status(200).json({ token, tokenType: "Bearer" });
}