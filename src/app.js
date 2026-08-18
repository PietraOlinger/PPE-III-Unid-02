import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Rotas
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware de erros
app.use(errorMiddleware);

export default app;
