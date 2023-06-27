import { Router } from "express";
const router = Router();
import { adminAuth } from "../middleware/auth.js";
import {
  signup,
  login,
  createCourse,
  editCourse,
  getAllCourses,
} from "../controllers/admin.controller.js";

// Admin routes
router.post("/signup", signup);

router.post("/login", login);

router.post("/courses", adminAuth, createCourse);

router.put("/courses/:courseId", adminAuth, editCourse);

router.get("/courses", adminAuth, getAllCourses);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Admin route not found." });
});

export default router;
