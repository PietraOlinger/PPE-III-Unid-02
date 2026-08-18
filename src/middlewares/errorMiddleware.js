export default function errorMiddleware(err, req, res, next) {
  console.error(`[${req.method} ${req.originalUrl}]`, err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Dados inválidos", details: Object.values(err.errors).map(({ message }) => message) });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Identificador inválido" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: "Registro já cadastrado" });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    error: statusCode === 500 ? "Erro interno do servidor" : err.message
  });
}
