const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(cors());

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes for User Management
app.use("/api/v1/user", require("./routes/userRoutes"));

// Routes for Course Management
const courseRouter = require("./routes/courseRoutes");
app.use("/api/v1/courses", courseRouter);

//Routes for Room Management
const roomRouter = require("./routes/roomRoutes");
app.use("/api/v1/rooms", roomRouter);

// Routes for Timetable Management
const timetableRouter = require("./routes/timetableRoutes");
app.use("/api/v1/timetable", timetableRouter);

const lecturerRoutes = require("./routes/lecturerRoutes");
app.use("/api/lecturer", lecturerRoutes); // Add this line

const facultyRoutes = require("./routes/facultyRoutes");
// Routes for Faculty Management
app.use("/api/v1/faculty", facultyRoutes);

// Listen on port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
