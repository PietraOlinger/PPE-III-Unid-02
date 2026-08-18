import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export default function authMiddleware(req, res, next) {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token Bearer ausente ou inválido" });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}
