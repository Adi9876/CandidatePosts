import express from "express";
import multer from "multer";
import {
  extractSkillsFromResume,
} from "../controllers/skillController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post("/extract", upload.single("resume"), extractSkillsFromResume);

export default router;
