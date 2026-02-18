import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Scam Detector
        </Link>
      </h1>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-4 md:items-center absolute md:static top-14 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0`}
      >
        {!user ? (
          <>
            <Link
              to="/login"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* ✅ HOME OPTION ADDED */}
            <Link
              to="/"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/text-detection"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Text Detection
            </Link>

            <Link
              to="/voice-detection"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Voice Detection
            </Link>

            <Link
              to="/tips"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Safety Tips
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
