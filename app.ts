import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./src/config/db.config";

const app = express();

console.log("App starting...");

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("🚀 app listening on port:", PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
