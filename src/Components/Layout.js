import React from "react";
import Dashboard from "../pages/dashboard/dashboard";
import styles from "./Layout-style.css"; // Optional for layout styling



function Layout({ children }) {
    return (
      <div className="layout">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <Dashboard />
        </aside>
  
        {/* Right Content Area */}
        <main className="content">{children}</main>
      </div>
    );
  }

  export default Layout;