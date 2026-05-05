import express from "express";
import {
  register,
  update,
  login,
  deleteUser,
  get,
  getAll,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validation.middleware";
import { registerSchema, updateSchema } from "../validators/user.validator";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", login);
router.put("/update/:id", validate(updateSchema), update);
router.delete("/delete/:id", deleteUser);
router.get("/get/:id", get);
router.get("/get-all", getAll);

export default router;
