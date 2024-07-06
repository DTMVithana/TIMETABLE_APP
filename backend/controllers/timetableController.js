// timetableController.js
const Timetable = require("../models/Timetable");
const EmailService = require("../services/emailService");
const User = require("../models/userModels");
const userModel = require("../models/userModels");

// Create a new timetable entry with validation
exports.createTimetableEntry = async (req, res) => {
  try {
    // Extract timetable data from the request body
    const timetableData = req.body;

    // Create a new timetable entry
    const timetableEntry = new Timetable(timetableData);

    // Save the timetable entry to the database
    await timetableEntry.save();

    // Return the newly created timetable entry
    res.status(201).json(timetableEntry);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

// Get all timetable entries
exports.getAllTimetableEntries = async (req, res) => {
  try {
    const timetableEntries = await Timetable.find();
    res.json(timetableEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get timetable entry by ID
exports.getTimetableEntryById = async (req, res) => {
  try {
    const timetableEntry = await Timetable.findById(req.params.id);
    if (!timetableEntry) {
      return res.status(404).json({ message: "Timetable entry not found" });
    }
    res.json(timetableEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete timetable entry by ID
exports.deleteTimetableEntry = async (req, res) => {
  try {
    const timetableEntry = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetableEntry) {
      return res.status(404).json({ message: "Timetable entry not found" });
    }
    res.json({ message: "Timetable entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update timetable entry by ID
exports.updateTimetableEntry = async (req, res) => {
  try {
    const updatedTimetableEntry = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTimetableEntry) {
      return res.status(404).json({ message: "Timetable entry not found" });
    }

    // Send email notification
    await sendTimetableUpdateNotification(updatedTimetableEntry);

    res.json(updatedTimetableEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to send email notification
async function sendTimetableUpdateNotification(updatedTimetableEntry) {
  try {
    // Extract course ID from the updated timetable entry
    const courseId = updatedTimetableEntry.course;

    // Retrieve student emails from the user schema who are registered for the course
    const studentEmails = await User.find({
      role: "student",
      course: courseId,
    }).distinct("email");

    // Construct email parameters
    const subject = "Timetable Entry Updated";
    const text =
      "Dear Student, Your timetable entry has been updated. Please check the changes.";

    // Instantiate EmailService and send email to each student
    const emailService = new EmailService();
    for (const email of studentEmails) {
      await emailService.sendEmail(email, subject, text);
    }
  } catch (error) {
    console.error("Error sending email notification:", error);
    throw new Error("Failed to send email notification");
  }
}

// Get timetable entry by Faculty ID and Course ID
exports.getTimetableByFacultyAndCourse = async (req, res) => {
  try {
    const { facultyId, courseId } = req.params;

    const timetableEntries = await Timetable.find({
      faculty: facultyId,
      course: courseId,
    });

    res.json(timetableEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
