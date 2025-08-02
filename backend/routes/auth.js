import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
import { loginUser, registerUser } from "../controllers/authController.js";
dotenv.config();

router.post("/register",registerUser);
router.post("/login", loginUser);
  

export default router;
