import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const FacultyComponent = () => {
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    courses: [],
  });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/v1/faculty");
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/faculty", formData);
      fetchFaculties();
      setFormData({ name: "", courses: [] });
    } catch (error) {
      console.error("Error creating faculty:", error);
    }
  };

  // Function to handle navigation to timetable creation page
  const handleCreateTimetable = (facultyId) => {
    //navigate(`/timetableform/${facultyId}`); // Navigate to the specified URL

    navigate("/timetableform");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Faculty</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center mb-4">
          <label className="mr-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Faculty
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Faculties</h2>
      <ul>
        {faculties.map((faculty) => (
          <li
            key={faculty._id}
            className="border-b border-gray-300 py-2 flex items-center"
          >
            {faculty.name}
            <button
              onClick={() => handleCreateTimetable(faculty._id)} // Pass faculty ID to handleCreateTimetable function
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Timetable
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyComponent;
