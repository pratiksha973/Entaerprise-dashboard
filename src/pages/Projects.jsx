import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem("projectflow_projects");
  
  if (savedProjects) {
    return JSON.parse(savedProjects);
  }

  return [
    {
      id: 1,
      name: "Website Redesign",
      manager: "Amit",
      team: 5,
      startDate: "2026-08-01",
      deadline: "2026-09-30",
      progress: 75,
      status: "In Progress",
    },

    {
      id: 2,
      name: "Mobile App",
      manager: "Rahul",
      team: 6,
      startDate: "2026-07-15",
      deadline: "2026-10-15",
      progress: 60,
      status: "In Progress",
    },

    {
      id: 3,
      name: "CRM System",
      manager: "Sneha",
      team: 4,
      startDate: "2026-06-01",
      deadline: "2026-09-20",
      progress: 90,
      status: "Review",
    }
  ];
});

  // NEW PROJECT FORM STATE
  const [showForm, setShowForm] = useState(false);


  // NEW PROJECT DATA
  const [newProject, setNewProject] = useState({
    name: "",
    manager: "",
    team: "",
    startDate: "",
    deadline: "",
    progress: 0,
    status: "In Progress",
  });
  // SAVE PROJECTS TO LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem(
      "projectflow_projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const filteredProjects = projects.filter((project) => {

    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      project.status === statusFilter;

    return matchesSearch && matchesStatus;

  });


  const deleteProject = (id) => {

    setProjects(
      projects.filter((project) => project.id !== id)
    );

  };

const addProject = () => {
  if (
    !newProject.name ||
    !newProject.manager ||
    !newProject.team ||
    !newProject.startDate ||
    !newProject.deadline
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const project = {
    id: Date.now(),
    name: newProject.name,
    manager: newProject.manager,
    team: Number(newProject.team),
    startDate: newProject.startDate,
    deadline: newProject.deadline,
    progress: Number(newProject.progress),
    status: newProject.status,
  };

  setProjects([...projects, project]);

  setNewProject({
    name: "",
    manager: "",
    team: "",
    startDate: "",
    deadline: "",
    progress: 0,
    status: "In Progress",
  });

  setShowForm(false);
};
  return (

    <div className="projects-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h1>Projects</h1>

          <p>
            Manage and monitor all your projects
          </p>

        </div>
<button
  className="primary-btn"
  onClick={() => setShowForm(true)}
>
  + New Project
</button>
       

      </div>

{showForm && (
  <div className="project-form-card">

    <div className="project-form-header">
      <div>
        <h2>Create New Project</h2>
        <p>Add a new project to your workspace.</p>
      </div>

      <button
        className="close-form-btn"
        onClick={() => setShowForm(false)}
      >
        ✕
      </button>
    </div>

    <div className="project-form">

      <div className="form-group">
        <label>Project Name</label>
        <input
          type="text"
          placeholder="Enter project name"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              name: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Manager</label>
        <input
          type="text"
          placeholder="Enter manager name"
          value={newProject.manager}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              manager: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Team Members</label>
        <input
          type="number"
          min="1"
          placeholder="Number of members"
          value={newProject.team}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              team: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          value={newProject.startDate}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              startDate: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Deadline</label>
        <input
          type="date"
          value={newProject.deadline}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              deadline: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Progress (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={newProject.progress}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              progress: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Status</label>

        <select
          value={newProject.status}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              status: e.target.value,
            })
          }
        >
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="On Track">On Track</option>
          <option value="At Risk">At Risk</option>
          <option value="Behind">Behind</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

    </div>

    <div className="project-form-actions">

      <button
        className="secondary-btn"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>

      <button
        className="primary-btn"
        onClick={addProject}
      >
        Add Project
      </button>

    </div>

  </div>
)}
      {/* Statistics */}

      <div className="project-stats">

        <div className="project-stat-card">

          <span>Total Projects</span>

          <h2>{projects.length}</h2>

        </div>


        <div className="project-stat-card">

          <span>Active</span>

          <h2>
            {
              projects.filter(
                (project) =>
                  project.status === "On Track"
              ).length
            }
          </h2>

        </div>


        <div className="project-stat-card">

          <span>Completed</span>

          <h2>
            {
              projects.filter(
                (project) =>
                  project.status === "Completed"
              ).length
            }
          </h2>

        </div>


        <div className="project-stat-card">

          <span>At Risk</span>

          <h2>
            {
              projects.filter(
                (project) =>
                  project.status === "At Risk" ||
                  project.status === "Behind"
              ).length
            }
          </h2>

        </div>

      </div>


      {/* Filters */}

      <div className="project-toolbar">

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="project-search"
        />


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="status-filter"
        >

          <option value="All">
            All Status
          </option>

          <option value="On Track">
            On Track
          </option>

          <option value="At Risk">
            At Risk
          </option>

          <option value="Behind">
            Behind
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

      </div>


      {/* Project Table */}

      <div className="projects-table-card">

        <table className="projects-table">

          <thead>

            <tr>

              <th>Project</th>

              <th>Manager</th>

              <th>Team</th>

              <th>Start Date</th>

              <th>Deadline</th>

              <th>Progress</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>
               {filteredProjects.map((project) => (
  <tr
    key={project.id}
    className="project-row"
    onClick={() => {
       navigate(`/projects/${project.id}`, {
        state: { project },
      })
    }}
  >

                <td>

                  <strong className="project-name">
                    {project.name}
                  </strong>

                </td>

                <td>
                  {project.manager}
                </td>

                <td>
                  {project.team} members
                </td>

                <td>
                  {project.startDate}
                </td>

                <td>
                  {project.deadline}
                </td>

                <td>

                  <div className="table-progress">

                    <div className="table-progress-bar">

                      <div
                        className="table-progress-fill"
                        style={{
                          width:
                            `${project.progress}%`
                        }}
                      ></div>

                    </div>

                    <span>
                      {project.progress}%
                    </span>

                  </div>

                </td>


                <td>

                  <span
                    className={`status-badge ${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>

                </td>


                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProject(project.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Projects;