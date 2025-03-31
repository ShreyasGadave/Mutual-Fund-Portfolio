import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Service from "./Pages/Service";
import AdminServices from "./Pages/AdminServices";
import AdminAbout from "./Pages/AdminAbout";
import AdminTestimonials from "./Pages/AdminTestimonials";
import Error from "./Components/Error/ErrorPage";
import AdminInfo from "./Pages/AdminProfile";
import Admin from "./Pages/Login";
import About from "./Pages/About";
import { auth } from "./Services/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./Components/ProtectedRoute"; 
import Login from "./Pages/Login";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user); 
      // console.log("User is logged in:", user.email);
      
      if (!user) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:id" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About/>} />

        {/* 🛑 Protected Routes Start Here */}
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <AdminAbout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/service"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <AdminTestimonials />
            </ProtectedRoute>
          }
        />
        {/* 🛑 Protected Routes End Here */}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
