// routes/lecturerRoutes.js

const express = require("express");
const router = express.Router();
const lecturerController = require("../controllers/lecturerController");

router.post("/", lecturerController.createLecturer);
router.get("/", lecturerController.getLecturers);
router.put("/:id", lecturerController.updateLecturer);
router.delete("/:id", lecturerController.deleteLecturer);
router.get("/:id", lecturerController.getLecturerById);

module.exports = router;
