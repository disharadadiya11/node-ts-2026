import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fileUpload from "express-fileupload";
import { connectDB } from "./src/config/db.config";
import routes from "./src/routes/index.routes";
import { applyAuthenticate } from "./src/middlewares/auth.middleware";
const app = express();

// Middleware

connectDB();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(applyAuthenticate);
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("🚀 app listening on port:", process.env.PORT);
});
