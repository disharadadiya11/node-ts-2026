import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fileUpload from "express-fileupload";
import { connectDB } from "./src/config/db.config";
import routes from "./src/routes/index.routes";

const app = express();

// Middleware

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("App starting...");

const startServer = async () => {
  try {
    await connectDB();

    // Routes
    app.use("/api", routes);

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
