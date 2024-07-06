// routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for Course Management
router.post("/", authMiddleware, courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", authMiddleware, courseController.updateCourse);
router.delete("/:id", authMiddleware, courseController.deleteCourse);
// GET all courses for a specific faculty
router.get("/faculty/:id", courseController.getCoursesByFacultyId);

module.exports = router;
