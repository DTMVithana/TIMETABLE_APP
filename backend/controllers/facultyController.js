const Faculty = require("../models/Faculty");
const Course = require("../models/Course");

const authMiddleware = require("../middlewares/authMiddleware");

// Create a new faculty member
exports.createFaculty = async (req, res) => {
  try {
    // Check if user is authorized to create a course (e.g., admin role)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all faculty members
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().populate("courses");
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get faculty by ID
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("courses");
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update faculty member
exports.updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(updatedFaculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete faculty member
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a course to a faculty member
exports.addCourseToFaculty = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const courseId = req.body.courseId;

    // Find the faculty member
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add the course to the faculty's courses array
    faculty.courses.push(courseId);
    await faculty.save();

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
