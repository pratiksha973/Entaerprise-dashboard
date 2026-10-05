import { useLocation, useNavigate , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
function ProjectDetails() {
  const navigate = useNavigate();
  const location = useLocation();
const { id } = useParams();

const [project, setProject] = useState(
  location.state?.project || null
);
const { tasks } = useTasks();

useEffect(() => {
  if (project) return;

  const savedProjects = localStorage.getItem("projectflow_projects");

  if (savedProjects) {
    const projects = JSON.parse(savedProjects);

    const foundProject = projects.find(
      (item) => String(item.id) === String(id)
    );

    setProject(foundProject || null);
  }
}, [id, project]);
const projectTasks = tasks.filter((task) => {
  const taskProject = String(task.project || "")
    .trim()
    .toLowerCase();

  const projectName = String(project?.name || "")
    .trim()
    .toLowerCase();

  return taskProject === projectName;
});
  if (!project) {
    return (
      <div className="project-details">
        <h2>Project not found</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/projects")}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-details">
      <div className="project-details-header">
        <div>
          <button
            className="back-btn"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </button>

          <h1>{project.name}</h1>
          <p>{project.description || "No description available."}</p>
        </div>

        <span className={`project-status ${project.status}`}>
          {project.status}
        </span>
      </div>

      <div className="project-details-grid">
        <div className="project-detail-card">
          <span>Progress</span>
          <strong>{project.progress || 0}%</strong>
        </div>

        <div className="project-detail-card">
          <span>Manager</span>
          <strong>{project.manager || "Not assigned"}</strong>
        </div>

        <div className="project-detail-card">
          <span>Team Size</span>
          <strong>{project.team || 0}</strong>
        </div>

        <div className="project-detail-card">
          <span>Deadline</span>
          <strong>{project.deadline || "Not set"}</strong>
        </div>
        <div className="project-detail-card">
  <span>Start Date</span>
  <strong>{project.startDate || "Not set"}</strong>
</div>
<div className="project-detail-card">
  <span>Team</span>
  <strong>
  {project.team || 0} Members
</strong>
</div>
      </div>
      <div className="project-progress-details">
  <div className="project-progress-header">
    <h3>Project Progress</h3>
    <strong>{project.progress || 0}%</strong>
  </div>
  <div className="related-task-summary">

  <div>
    <span>Total</span>
    <strong>{projectTasks.length}</strong>
  </div>

  <div>
    <span>To Do</span>
    <strong>
      {projectTasks.filter(
        (task) => task.status === "To Do"
      ).length}
    </strong>
  </div>

  <div>
    <span>In Progress</span>
    <strong>
      {projectTasks.filter(
        (task) => task.status === "In Progress"
      ).length}
    </strong>
  </div>

  <div>
    <span>Done</span>
    <strong>
      {projectTasks.filter(
        (task) => task.status === "Done"
      ).length}
    </strong>
  </div>

</div>
  <div className="progress-bar">
    <div
      className="progress"
      style={{ width: `${project.progress || 0}%` }}
    ></div>
  </div>
  <div className="project-related-tasks">
  <div className="project-progress-header">
    <h3>Related Tasks</h3>
    <strong>{projectTasks.length} Tasks</strong>
  </div>

  {projectTasks.length === 0 ? (
    <p>No tasks found for this project.</p>
  ) : (
    <div className="related-task-list">
      {projectTasks.map((task) => (
        <div className="related-task" key={task.id}>
          <div>
            <h4>{task.title}</h4>
            <p>
              Assigned to: {task.assignee} • Deadline: {task.deadline}
            </p>
          </div>

          <div className="related-task-right">
            <span className={`task-priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>

            <span className={`task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}>
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>
    </div>
  );
}

export default ProjectDetails;