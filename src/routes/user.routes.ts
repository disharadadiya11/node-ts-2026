import express from "express";
import {
  register,
  update,
  login,
  deleteUser,
  get,
  getAll,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);
router.get("/get/:id", get);
router.get("/get-all", getAll);

export default router;
