import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
   const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("projectflow_tasks");
    const savedProjects = localStorage.getItem("projectflow_projects");
    const savedMembers = localStorage.getItem("projectflow_members");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
  }, []);
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;
 const completionRate =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const totalProjects = projects.length;

  const totalMembers = members.length;
  const projectProgress = projects.map((project) => ({
  name: project.name,
  progress: project.progress || 0,
}));
const taskStatusData = {
  todo: tasks.filter((task) => task.status === "To Do").length,
  inProgress: tasks.filter((task) => task.status === "In Progress").length,
  review: tasks.filter((task) => task.status === "Review").length,
  completed: tasks.filter((task) => task.status === "Done").length,
};
const recentTasks = [...tasks].slice(-5).reverse();
  return (
    <div className="dashboard">

      {/* Page Heading */}

      <div className="dashboard-heading">

        <div>
          <h1>Good Morning, Pratiksha 👋</h1>

          <p>
            Here's what's happening with your projects today.
          </p>
        </div>
          <button
  className="primary-btn"
  onClick={() => navigate("/projects")}
>
  + New Project
</button>
      </div>


      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card clickable-card"
        onClick={() => navigate("/projects")}>

          <p>Total Projects</p>

          <h2>{totalProjects}</h2>

          <span className="positive">
            ↑ 12% this month
          </span>

        </div>


        <div className="stat-card clickable-card"
  onClick={() => navigate("/tasks")}>

          <p>Total Tasks</p>

          <h2>{totalTasks}</h2>

          <span className="positive">
            ↑ 8% this week
          </span>

        </div>


        <div className="stat-card">

          <p>Completed Tasks</p>

          <h2>{completedTasks}</h2>

          <span className="positive">
            ↑ 15% this month
          </span>

        </div>


        <div className="stat-card clickable-card"
  onClick={() => navigate("/team")}>

          <p>Team Members</p>

          <h2>{totalMembers}</h2>

          <span className="positive">
            ↑ 2 new members
          </span>

        </div>

      </div>


      {/* Main Dashboard */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-header">
            <h3>Project Progress</h3>
<button onClick={() => navigate("/projects")}>
  View All →
</button>
            
          </div>

{projectProgress.length === 0 ? (
  <p>No projects available.</p>
) : (
  projectProgress.map((project) => (
    <div className="project-item" key={project.name}>
      <div className="project-info">
        <span>{project.name}</span>
        <strong>{project.progress}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
    </div>
  ))
)}
          </div>
        {/* Task Status */}

        <div className="dashboard-card">

          <div className="card-header">
            <h3>Task Status</h3>

           <button onClick={() => navigate("/tasks")}>
  View All →
</button>
          </div>

          <div className="task-status">

            <div className="status-row">
              <span className="status-dot todo"></span>
              <span>To Do</span>
              <strong>{taskStatusData.todo}</strong>
            </div>

            <div className="status-row">
              <span className="status-dot progress-status"></span>
              <span>In Progress</span>
             <strong>{taskStatusData.inProgress}</strong>
            </div>

            <div className="status-row">
              <span className="status-dot review"></span>
              <span>Review</span>
              <strong>{taskStatusData.review}</strong>
            </div>

            <div className="status-row">
              <span className="status-dot completed"></span>
              <span>Completed</span>
              <strong>{taskStatusData.completed}</strong>
            </div>

          </div>

        </div>


      </div>
      
        <div className="dashboard-card recent-tasks-card">
        <div className="card-header">
          <h3>Recent Tasks</h3>

          <button onClick={() => navigate("/tasks")}>
            View All →
          </button>
        </div>

        <div className="recent-tasks">
          {recentTasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            recentTasks.map((task) => (
              <div className="recent-task" key={task.id}>
                <div>
                  <h4>{task.title}</h4>
                  <p>
                    {task.project} • {task.assignee}
                  </p>
                </div>

                <span className="recent-task-status">
                  {task.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    
  );
}

export default Dashboard;