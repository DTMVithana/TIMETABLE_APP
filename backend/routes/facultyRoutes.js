const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for CRUD operations on faculty
router.post("/", authMiddleware, facultyController.createFaculty);
router.get("/", facultyController.getAllFaculty);
router.get("/:id", facultyController.getFacultyById);
router.put("/:id", facultyController.updateFaculty);
router.delete("/:id", facultyController.deleteFaculty);

// Route to add a course to a faculty member
router.post("/:id/courses", facultyController.addCourseToFaculty);

module.exports = router;
