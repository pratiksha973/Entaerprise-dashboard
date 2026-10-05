
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        ProjectFlow
      </div>

      <p className="logo-subtitle">
        Enterprise PM
      </p>

      <nav className="sidebar-nav">
<NavLink to="/" className="sidebar-link">
  <span className="sidebar-icon">🏠</span>
  <span>Dashboard</span>
</NavLink>

<NavLink to="/projects" className="sidebar-link">
  <span className="sidebar-icon">📁</span>
  <span>Projects</span>
</NavLink>

<NavLink to="/tasks" className="sidebar-link">
  <span className="sidebar-icon">✓</span>
  <span>Tasks</span>
</NavLink>

<NavLink to="/kanban" className="sidebar-link">
  <span className="sidebar-icon">📋</span>
  <span>Kanban</span>
</NavLink>

<NavLink to="/team" className="sidebar-link">
  <span className="sidebar-icon">👥</span>
  <span>Team</span>
</NavLink>

<NavLink to="/analytics" className="sidebar-link">
  <span className="sidebar-icon">📊</span>
  <span>Analytics</span>
</NavLink>

<NavLink to="/notifications" className="sidebar-link">
  <span className="sidebar-icon">🔔</span>
  <span>Notifications</span>
</NavLink>

<NavLink to="/settings" className="sidebar-link">
  <span className="sidebar-icon">⚙️</span>
  <span>Settings</span>
</NavLink>
        
 


      </nav>

    </aside>
  );
}

export default Sidebar;