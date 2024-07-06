const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["lecture hall", "lab", "conference_room"],
    required: true,
  },
  capacity: { type: Number, required: true },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
