import React from "react";
import Layout from "../components/Layout";

const TimetableHomePage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex justify-center items-center">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            University Timetable System
          </h1>
          <p className="text-white text-lg mb-8 text-center">
            Welcome to the hub of academic scheduling at our university. Explore
            your classes, manage your time, and stay organized!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample timetable cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Card content */}
              <h2 className="text-xl font-semibold mb-2">Monday</h2>
              <p className="text-gray-700">8:00 AM - 10:00 AM: Math 101</p>
              <p className="text-gray-700">11:00 AM - 1:00 PM: Physics 201</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Card content */}
              <h2 className="text-xl font-semibold mb-2">Tuesday</h2>
              <p className="text-gray-700">9:00 AM - 11:00 AM: History 101</p>
              <p className="text-gray-700">1:00 PM - 3:00 PM: Biology 301</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Card content */}
              <h2 className="text-xl font-semibold mb-2">Wednesday</h2>
              <p className="text-gray-700">
                10:00 AM - 12:00 PM: Chemistry 201
              </p>
              <p className="text-gray-700">2:00 PM - 4:00 PM: English 101</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimetableHomePage;
