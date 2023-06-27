import { Router } from "express";
const router = Router();
import { userAuth } from "../middleware/auth.js";
import {
  signup,
  login,
  courses,
  purchaseCourse,
  purchasedCourse,
} from "../controllers/user.controller.js";

// User routes

router.post("/signup", signup);

router.post("/login", login);

router.get("/courses", userAuth, courses);

router.post("/course/:courseId", userAuth, purchaseCourse);

router.get("/purchasedCourse", userAuth, purchasedCourse);

router.use("*", (req, res) => {
  res.status(404).json({ message: "User route not found." });
});

export default router;
