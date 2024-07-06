import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Appointments } from "./functions/reservationFun/pages/Appointments";
import Doctors from "./pages/admin/Doctors";
import CourseList from "./pages/CourseList";
import HelloTeacherPage from "./components/HelloTeacherPage";
import CreateTimetableForm from "./components/TimeTable/CreateTimetableForm";
import FacultyComponent from "./components/FacultyComponent";
import TimetableComponent from "./components/TimetableComponent";

import { Aform } from "./functions/reservationFun/pages/Aform";
import { Payment } from "./functions/reservationFun/pages/Payment";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <HomePage />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* <Route path="/notification" element={<ProtectedRoute> <NotificationPage /> </ProtectedRoute>}/> */}

          {/*      <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />

          <Route path="/hello-teacher" element={<HelloTeacherPage />} />
          <Route path="/timetableform" element={<CreateTimetableForm />} />
          <Route path="/fac" element={<FacultyComponent />} />
          <Route path="/viewTimetable" element={<TimetableComponent />} />

          <Route
            path="/Aform"
            element={
              <ProtectedRoute>
                <Aform />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
