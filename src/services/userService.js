import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

const register = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new AppError("E-mail já cadastrado", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name: name.trim(), email: normalizedEmail, password: hashedPassword });
  return user.save();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("Credenciais inválidas", 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError("Credenciais inválidas", 401);

  return jwt.sign({ id: user._id.toString() }, env.jwtSecret, { expiresIn: "1h" });
};

export default { register, login };
