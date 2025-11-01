import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">ProbMap</h2>
      </div>

      <ul className="navbar-links">
        <li>Home</li>
        <li>Report</li>
        <li>Pending</li>
        <li>History</li>
      </ul>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "🌙" : "☀️"}
        </button>
        <div className="profile-circle">T</div>
      </div>
    </nav>
  );
}
