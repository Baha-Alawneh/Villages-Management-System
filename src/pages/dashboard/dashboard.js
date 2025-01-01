import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const location = useLocation(); // Get the current path

  // Helper function to check if the current link is active
  const isActive = (path) => location.pathname === path;
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <Link className={`overview  ${isActive("/") ? "active" : ""}`} to="/">
        <i className="fas fa-chart-pie fa-fw"></i>
        <span>Overview</span>
      </Link>

      <Link className={`village-management ${isActive("/village-management") ? "active" : ""}`} to="/village-management">
        <i className="fas fa-cogs fa-fw"></i>
        <span>Village Management</span>
      </Link>

      <Link className={`chat ${isActive("/chat") ? "active" : ""}`} to="/chat">
        <i className="fas fa-comments fa-fw"></i>
        <span>Chat</span>
      </Link>

      <Link className={`gallery ${isActive("/gallery") ? "active" : ""}`} to="/gallery">
        <i className="fas fa-images fa-fw"></i>
        <span>Gallery</span>
      </Link>
    </div>
  );
}

export default Dashboard;
