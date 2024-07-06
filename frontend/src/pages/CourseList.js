import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCourse from "./EditCourse";
import Layout from "./../components/Layout";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Fetch courses from backend API
    axios
      .get("http://localhost:8000/api/v1/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleEdit = (courseId) => {
    setEditCourseId(courseId);
    setShowEditModal(true);
  };

  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8000/api/v1/courses/${courseToDelete}`)
      .then((response) => {
        // Filter out the deleted course from the state
        setCourses(courses.filter((course) => course._id !== courseToDelete));
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        setShowDeleteModal(false);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(
      courses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Course
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Course Name</th>
              <th className="border border-gray-200 px-4 py-2">Course Code</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Credits</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  {course.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {course.code}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {course.description}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {course.credits}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(course._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Delete Course
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this course? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditModal && (
          <EditCourse
            onClose={closeEditModal}
            onUpdate={updateCourse}
            courseData={courses.find((course) => course._id === editCourseId)}
          />
        )}
        {showAddModal && (
          <EditCourse
            onClose={closeAddModal}
            onUpdate={(newCourse) => {
              // Send new course data to backend and add to state
              axios
                .post("http://localhost:8000/api/v1/courses", newCourse)
                .then((response) => {
                  setCourses([...courses, response.data]);
                  setShowAddModal(false);
                })
                .catch((error) => {
                  console.error("Error adding course:", error);
                });
            }}
            courseData={{ name: "", code: "", description: "", credits: "" }}
          />
        )}
      </div>
    </Layout>
  );
};

export default CourseList;
