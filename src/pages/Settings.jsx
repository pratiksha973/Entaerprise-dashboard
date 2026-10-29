import { useState  , useEffect} from "react";

function Settings() {
  const [settings, setSettings] = useState(() => {
  const savedSettings = localStorage.getItem("projectflow_settings");

  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
return {
       fullName: "Pratiksha",
        email: "pratiksha@example.com",
        role: "Frontend Developer",
        language: "English",
        theme: "Light",
        emailNotifications: true,
        taskNotifications: true,
        projectNotifications: true,
      };
  
});
useEffect(() => {
    localStorage.setItem(
      "projectflow_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile and application preferences.</p>
        </div>
      </div>

      {/* PROFILE SETTINGS */}

      <div className="settings-section">

        <div className="settings-section-header">
          <h2>Profile Settings</h2>
          <p>Update your personal information.</p>
        </div>

        <div className="settings-form">

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullname"
              value={settings.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <input
              type="text"
              name="role"
              value={settings.role}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>

      {/* APPLICATION SETTINGS */}

      <div className="settings-section">

        <div className="settings-section-header">
          <h2>Application Settings</h2>
          <p>Customize your application preferences.</p>
        </div>

        <div className="settings-form">

          <div className="form-group">
            <label>Language</label>

            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Theme</label>

            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="System">System Default</option>
            </select>
          </div>

        </div>

      </div>

      {/* NOTIFICATION SETTINGS */}

      <div className="settings-section">

        <div className="settings-section-header">
          <h2>Notification Preferences</h2>
          <p>Choose which notifications you want to receive.</p>
        </div>

        <div className="notification-settings">

          <label className="setting-option">

            <div>
              <strong>Email Notifications</strong>
              <p>Receive important updates through email.</p>
            </div>

            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />

          </label>

          <label className="setting-option">

            <div>
              <strong>Task Notifications</strong>
              <p>Get notified when tasks are assigned or updated.</p>
            </div>

            <input
              type="checkbox"
              name="taskNotifications"
              checked={settings.taskNotifications}
              onChange={handleChange}
            />

          </label>

          <label className="setting-option">

            <div>
              <strong>Project Notifications</strong>
              <p>Get updates about your projects.</p>
            </div>

            <input
              type="checkbox"
              name="projectNotifications"
              checked={settings.projectNotifications}
              onChange={handleChange}
            />

          </label>

        </div>

      </div>

      {/* SAVE BUTTON */}

      <div className="settings-actions">

       
<button className="primary-btn" onClick={handleSave}>
  Save Changes
</button>
      </div>

    </div>
  );
}

export default Settings;