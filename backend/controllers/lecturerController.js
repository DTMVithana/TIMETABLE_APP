// controllers/lecturerController.js

const Lecturer = require("../models/Lecturer");

exports.createLecturer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const lecturer = new Lecturer({ name, email });
    await lecturer.save();
    res.status(201).json(lecturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json(lecturers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.status(200).json(updatedLecturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    await Lecturer.findByIdAndDelete(id);
    res.status(200).json({ message: "Lecturer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLecturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const lecturer = await Lecturer.findById(id);
    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    res.status(200).json(lecturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
