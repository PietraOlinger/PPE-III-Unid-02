import mongoose from "mongoose";
import app from "./app.js";
import { env } from "./config/env.js";

mongoose.connect(env.mongoUri)
  .then(() => app.listen(env.port, () => {
    console.log(`API ouvindo na porta ${env.port}`);
  }))
  .catch((error) => {
    console.error("Não foi possível conectar ao MongoDB", error);
    process.exitCode = 1;
  });