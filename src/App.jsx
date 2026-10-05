import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState , useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProjectDetails from "./pages/ProjectDetails";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import Kanban from "./pages/kanban";
import { TaskProvider } from "./context/TaskContext";
import Notifications from "./pages/Notifications";

import Settings from "./pages/Settings";
function App() {
  const [theme, setTheme] = useState(
  localStorage.getItem("projectflow_theme") || "Light"
);
useEffect(() => {
  document.body.classList.toggle("dark-theme", theme === "Dark");
}, [theme]);
useEffect(() => {
  const updateTheme = () => {
    const savedTheme =
      localStorage.getItem("projectflow_theme") || "Light";

    setTheme(savedTheme);
  };

  window.addEventListener(
    "projectflow-theme-updated",
    updateTheme
  );

  return () => {
    window.removeEventListener(
      "projectflow-theme-updated",
      updateTheme
    );
  };
}, []);
  return (
    <TaskProvider>
    <BrowserRouter>

      <div className="app-layout">

        <Sidebar />

        <div className="main-section">

          <Navbar />

          <main className="page-content">

            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route
                path="/projects"
                element={<Projects />}
              />

              <Route
                path="/tasks"
                element={<Tasks />}
              />

              
              <Route
               path="/kanban"
                element={<Kanban />}
                />
                <Route
                path="/team"
                element={<Team />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />
              <Route
               path="/notifications"
               element={<Notifications />}
              />
             <Route path="/settings" element={<Settings />} />
             <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
    </TaskProvider>
  );
}

export default App;