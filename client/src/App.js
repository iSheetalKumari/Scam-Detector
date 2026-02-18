import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import TextDetectionPage from "./pages/TextDetectionPage";
import VoiceDetectionPage from "./pages/VoiceDetectionPage";
import TipsPage from "./pages/TipsPage";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* If user not logged in -> redirect to login */}
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/text-detection"
          element={
            <ProtectedRoute>
              <TextDetectionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/voice-detection"
          element={
            <ProtectedRoute>
              <VoiceDetectionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tips"
          element={
            <ProtectedRoute>
              <TipsPage />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
