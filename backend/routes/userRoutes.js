import { Router } from "express";
const router = Router();
import dotenv from "dotenv";
dotenv.config();

import authenticateToken from "../middleware/authMiddleware.js";
import { getJobs, postJob } from "../controllers/jobController.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { createPost, getPosts } from "../controllers/postController.js";

router.use(authenticateToken);

router.route("/job").get(getJobs).post(postJob);
router.route("/profile").get(getProfile).put(updateProfile);
router.route("/dashboard").get(getPosts).post(createPost);

export default router;
