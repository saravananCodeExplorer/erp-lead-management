import React from "react";
import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">KlickEdu ERP</div>
        <ul className="sidebar-menu">
          <li className={`sidebar-item ${location.pathname === "/" ? "active" : ""}`}>
            <Link to="/">📊 Leads Dashboard</Link>
          </li>
        </ul>
      </aside>
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
