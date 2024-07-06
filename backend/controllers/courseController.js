// controllers/courseController.js
const jwt = require("jsonwebtoken");
const Course = require("../models/Course");

const authMiddleware = require("../middlewares/authMiddleware");

// Create course route handler with authentication middleware
exports.createCourse = async (req, res) => {
  try {
    // Check if user is authorized to create a course (e.g., admin role)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create the course (assuming req.body contains course data)
    const course = new Course(req.body);
    await course.save();

    // Send response with course data
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course by ID
exports.updateCourse = async (req, res) => {
  try {
    // Check if user is authorized to update a course (e.g., admin role)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course by ID
exports.deleteCourse = async (req, res) => {
  try {
    // Check if user is authorized to delete a course (e.g., admin role)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get courses by faculty ID
exports.getCoursesByFacultyId = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const courses = await Course.find({ faculty: facultyId });
    res.json(courses);
    console.log("hhh");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
