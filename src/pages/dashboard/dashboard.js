import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import "./dashboard.css";
import { GET_USER_BY_ID, LOGOUT_USER } from "../../grqphql/auth.js";

function Dashboard() {
  const navigate = useNavigate();
  const [logout, { loading: logoutLoading, error: logoutError }] = useMutation(LOGOUT_USER);
  const [adminName, setAdminName] = useState(null);
  const location = useLocation();
  const userId=useRef();
  const token =useRef();
  useEffect(() => {
    token.current = localStorage.getItem("authToken");
    try {
      const tokenParts = token.current.split(".");
      const decodedToken = JSON.parse(atob(tokenParts[1]));
      userId.current = decodedToken.id;
    } catch (error) {
      console.error("Invalid or missing token:", error);
    }
  }, []);

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId.current },
  });

  useEffect(() => {
    if (userData?.userById?.username) {
      setAdminName(userData.userById.username);
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      await logout({ variables: { token:token.current } });
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isActive = (path) => location.pathname === path;

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <Link className={`overview ${isActive("/") ? "active" : ""}`} to="/">
        <i className="fas fa-chart-pie fa-fw"></i>
        <span>Overview</span>
      </Link>

      <Link
        className={`village-management ${isActive("/village-management") ? "active" : ""}`}
        to="/village-management"
      >
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

      <div className="dashboard-footer">
        <div className="admin-information">
          <div className="admin-avatar" />
          <span>{adminName || "Loading..."}</span>
        </div>
        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          Logout
        </button>
        {logoutError && <p className="error-message">Error: {logoutError.message}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
