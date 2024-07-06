import React, { useEffect, useState } from "react";
import axios from "axios";

const TimetableComponent = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("/api/v1/faculty");
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const fetchCourses = async (facultyId) => {
    try {
      const response = await axios.get(`/api/v1/courses/faculty/${facultyId}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchTimetableEntries = async () => {
    try {
      const response = await axios.get(
        `/api/v1/timetable?course=${selectedCourse}`
      );

      // Fetch lecturer's name for each timetable entry
      const timetableEntriesWithLecturerNames = await Promise.all(
        response.data.map(async (entry) => {
          const lecturerResponse = await axios.get(
            `/api/lecturer/${entry.lecturer}`
          );
          return { ...entry, lecturer: lecturerResponse.data.name };
        })
      );

      setTimetableEntries(timetableEntriesWithLecturerNames);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching timetable entries:", error);
    }
  };

  useEffect(() => {
    if (selectedFaculty) {
      fetchCourses(selectedFaculty);
    }
  }, [selectedFaculty]);

  useEffect(() => {
    if (selectedCourse) {
      fetchTimetableEntries();
    }
  }, [selectedCourse]);

  const handleFacultyChange = (e) => {
    const facultyId = e.target.value;
    setSelectedFaculty(facultyId);
    setSelectedCourse(""); // Reset selected course when faculty changes
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Timetable</h2>
      <div className="mb-4">
        <label htmlFor="faculty" className="mr-2">
          Select Faculty:
        </label>
        <select
          id="faculty"
          value={selectedFaculty}
          onChange={handleFacultyChange}
          className="border p-1"
        >
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty._id} value={faculty._id}>
              {faculty.name}
            </option>
          ))}
        </select>
      </div>
      {selectedFaculty && (
        <div className="mb-4">
          <label htmlFor="course" className="mr-2">
            Select Course:
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="border p-1"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-600">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">Day</th>
              <th className="border border-gray-600 p-2">Time</th>
              <th className="border border-gray-600 p-2">Class Sessions</th>
              <th className="border border-gray-600 p-2">Lecturer</th>
              <th className="border border-gray-600 p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {timetableEntries.map((entry) => (
              <tr key={entry._id}>
                <td className="border border-gray-600 p-2">{entry.day}</td>
                <td className="border border-gray-600 p-2">{entry.time}</td>
                <td className="border border-gray-600 p-2">
                  {entry.classSessions.join(", ")}
                </td>
                <td className="border border-gray-600 p-2">{entry.lecturer}</td>{" "}
                {/* Display lecturer's name */}
                <td className="border border-gray-600 p-2">{entry.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimetableComponent;
