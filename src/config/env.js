import "dotenv/config";

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  return value;
};

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hamburgueria",
  jwtSecret: required("JWT_SECRET")
};