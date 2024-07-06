// models/Faculty.js

const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
