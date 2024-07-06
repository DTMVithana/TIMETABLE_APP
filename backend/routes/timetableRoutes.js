const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");
const { validateTimetable } = require("../middlewares/validateTimetable");

// Create timetable entry
router.post("/", validateTimetable, timetableController.createTimetableEntry);

// Get all timetable entries
router.get("/", timetableController.getAllTimetableEntries);

// Get timetable entry by ID
router.get("/:id", timetableController.getTimetableEntryById);

// Update timetable entry by ID
router.put("/:id", timetableController.updateTimetableEntry);

// Delete timetable entry by ID
router.delete("/:id", timetableController.deleteTimetableEntry);

// Get timetable entry by Faculty ID and Course ID
router.get(
  "/faculty/:facultyId/course/:courseId",
  timetableController.getTimetableByFacultyAndCourse
);

module.exports = router;
