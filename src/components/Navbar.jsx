import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
 const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("projectflow_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;
  useEffect(() => {
  const updateNotifications = () => {
    const saved = localStorage.getItem(
      "projectflow_notifications"
    );

    setNotifications(saved ? JSON.parse(saved) : []);
  };

  window.addEventListener(
    "projectflow-notifications-updated",
    updateNotifications
  );

  return () => {
    window.removeEventListener(
      "projectflow-notifications-updated",
      updateNotifications
    );
  };
}, []);
const [profile, setProfile] = useState(() => {
  const saved = localStorage.getItem("projectflow_settings");

  if (saved) {
    const settings = JSON.parse(saved);

    return {
      fullName: settings.fullName,
      role: settings.role,
    };
  }

  return {
    fullName: "Pratiksha",
    role: "Frontend Developer",
  };
});
useEffect(() => {
  const updateProfile = () => {
    const saved = localStorage.getItem("projectflow_settings");

    if (saved) {
      const settings = JSON.parse(saved);

      setProfile({
        fullName: settings.fullName,
        role: settings.role,
      });
    }
  };

  window.addEventListener(
    "projectflow-settings-updated",
    updateProfile
  );

  return () => {
    window.removeEventListener(
      "projectflow-settings-updated",
      updateProfile
    );
  };
}, []);
  return (
    <header className="navbar">

      {/* LEFT SIDE */}

      <div className="navbar-left">
        <h2>Project Management</h2>
      </div>

      {/* RIGHT SIDE */}

      <div className="navbar-right">

        {/* Notification */}

        <Link
          to="/notifications"
          className="navbar-notification"
        >
          🔔
          {unreadCount > 0 && (
    <span className="notification-badge">
      {unreadCount}
    </span>
  )}
        </Link>

        {/* Profile */}

        <div className="profile-container">

          <button
            className="profile-button"
            onClick={() => setShowMenu(!showMenu)}
          >

            <div className="profile-avatar">
              P
            </div>

            <div className="profile-info">
              <strong>{profile.fullName}</strong>
              <span>{Profiler.rolr}</span>
            </div>

            <span className="profile-arrow">
              ▼
            </span>

          </button>

          {/* DROPDOWN */}

          {showMenu && (
            <div className="profile-dropdown">

              <Link to="/settings">
                ⚙️ Settings
              </Link>

              <Link to="/notifications">
                🔔 Notifications
              </Link>

              <button
                onClick={() => alert("Logout functionality will be added later.")}
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;