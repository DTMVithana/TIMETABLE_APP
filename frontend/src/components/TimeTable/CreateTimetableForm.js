/* import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import { useParams } from "react-router-dom";

function CreateTimetableForm() {
  const { id } = useParams(); // Get the faculty ID from route parameters
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    faculty: id, // Set the faculty ID obtained from route parameters
    course: "",
    day: "",
    time: "",
    classSessions: "",
    lecturer: "",
    location: "",
  });

  useEffect(() => {
    // Fetch courses for the specific faculty from the backend
    axios
      .get(`/api/v1/faculty/${id}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });

    // Fetch lecturers from the backend
    axios
      .get("/api/lecturers")
      .then((response) => {
        setLecturers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lecturers:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to the backend to create a new timetable record
    axios
      .post("/api/timetable", formData)
      .then((response) => {
        console.log("Timetable record created successfully:", response.data);
        // Optionally, reset the form after successful submission
        setFormData({
          faculty: id, // Reset the faculty ID
          course: "",
          day: "",
          time: "",
          classSessions: "",
          lecturer: "",
          location: "",
        });
      })
      .catch((error) => {
        console.error("Error creating timetable record:", error);
      });
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-2xl mb-4">Enter Timetable Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Lecturer:</label>
          <select
            name="lecturer"
            value={formData.lecturer}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer._id} value={lecturer._id}>
                {lecturer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Day:</label>
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Time:</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Class Sessions:</label>
          <input
            type="text"
            name="classSessions"
            value={formData.classSessions}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTimetableForm;
 */

import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests

function CreateTimetableForm() {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    faculty: "", // Assuming you have a way to select faculty as well
    course: "",
    day: "",
    time: "",
    classSessions: "",
    lecturer: "",
    location: "",
  });

  useEffect(() => {
    // Fetch courses from the backend
    axios
      .get("/api/v1/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });

    // Fetch lecturers from the backend
    axios
      .get("/api/lecturers")
      .then((response) => {
        setLecturers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lecturers:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to the backend to create a new timetable record
    axios
      .post("/api/timetable", formData)
      .then((response) => {
        console.log("Timetable record created successfully:", response.data);
        // Optionally, reset the form after successful submission
        setFormData({
          faculty: "",
          course: "",
          day: "",
          time: "",
          classSessions: "",
          lecturer: "",
          location: "",
        });
      })
      .catch((error) => {
        console.error("Error creating timetable record:", error);
      });
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-2xl mb-4">Enter Timetable Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Lecturer:</label>
          <select
            name="lecturer"
            value={formData.lecturer}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer._id} value={lecturer._id}>
                {lecturer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Day:</label>
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Time:</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Class Sessions:</label>
          <input
            type="text"
            name="classSessions"
            value={formData.classSessions}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTimetableForm;
