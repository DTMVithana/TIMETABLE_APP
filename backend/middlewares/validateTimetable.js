const Timetable = require("../models/Timetable");

// Middleware function to validate timetable entries
exports.validateTimetable = async (req, res, next) => {
  try {
    const { location, startDateTime, endDateTime } = req.body;

    // Check if there is any existing timetable entry with the same location
    const existingTimetable = await Timetable.findOne({ location });

    // If there is an existing record with the same location, return an error
    if (existingTimetable) {
      return res.status(400).json({
        message:
          "Another timetable entry already exists for the same location.",
      });
    }

    // Check if there are any existing timetable entries with overlapping time slots
    const overlappingTimetable = await Timetable.findOne({
      $or: [
        {
          startDateTime: { $lte: endDateTime },
          endDateTime: { $gte: startDateTime },
        },
        { startDateTime: { $gte: startDateTime, $lte: endDateTime } },
      ],
    });

    // If there is an existing record with overlapping time slots, return an error
    if (overlappingTimetable) {
      return res.status(400).json({
        message: "Another timetable entry exists with overlapping time slots.",
      });
    }

    // If no existing entry with the same location or overlapping time slots, proceed to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
