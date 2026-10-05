import { useState } from "react";
import { useTasks } from "../context/TaskContext";
function Tasks() {
  const { tasks, setTasks } = useTasks();
  const [showForm, setShowForm] = useState(false);

const [newTask, setNewTask] = useState({
  title: "",
  project: "",
  assignee: "",
  priority: "Medium",
  deadline: "",
  status: "To Do",
});
const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");


  // Search + Filter

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );

  });


  // Delete task

  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    );

  };
const addTask = () => {
  if (
    !newTask.title ||
    !newTask.project ||
    !newTask.assignee ||
    !newTask.deadline
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const task = {
    id: Date.now(),
    ...newTask,
  };

  setTasks([...tasks, task]);

  setNewTask({
    title: "",
    project: "",
    assignee: "",
    priority: "Medium",
    deadline: "",
    status: "To Do",
  });

  setShowForm(false);
};

  return (

    <div className="tasks-page">


      {/* Page Header */}

      <div className="page-header">

        <div>

          <h1>Tasks</h1>

          <p>
            Manage and track all project tasks
          </p>

        </div>

<button
  className="primary-btn"
  onClick={() => setShowForm(true)}
>
  + New Task
</button>
        

      </div>
      {showForm && (
  <div className="project-form-card">

    <h2>Create New Task</h2>

    <div className="project-form">

      {/* Task Title */}
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            title: e.target.value,
          })
        }
      />

      {/* Project */}
      <input
        type="text"
        placeholder="Project"
        value={newTask.project}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            project: e.target.value,
          })
        }
      />

      {/* Assignee */}
      <input
        type="text"
        placeholder="Assignee"
        value={newTask.assignee}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            assignee: e.target.value,
          })
        }
      />

      {/* Priority */}
      <select
        value={newTask.priority}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            priority: e.target.value,
          })
        }
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Deadline */}
      <input
        type="date"
        value={newTask.deadline}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            deadline: e.target.value,
          })
        }
      />

      {/* Status */}
      <select
        value={newTask.status}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            status: e.target.value,
          })
        }
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Review">Review</option>
        <option value="Done">Done</option>
      </select>

      {/* Buttons */}
      <div className="form-actions">

        <button
          type="button"
          className="secondary-btn"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="primary-btn"
          onClick={addTask}
        >
          Add Task
        </button>

      </div>

    </div>
  </div>
)}

      {/* Statistics */}

      <div className="task-stats">


        <div className="task-stat-card">

          <span>Total Tasks</span>

          <h2>
            {tasks.length}
          </h2>

        </div>


        <div className="task-stat-card">

          <span>To Do</span>

          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status === "To Do"
              ).length
            }
          </h2>

        </div>


        <div className="task-stat-card">

          <span>In Progress</span>

          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status === "In Progress"
              ).length
            }
          </h2>

        </div>


        <div className="task-stat-card">

          <span>Completed</span>

          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status === "Done"
              ).length
            }
          </h2>

        </div>

      </div>


      {/* Filters */}

      <div className="task-toolbar">


        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="task-search"
        />


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="task-filter"
        >

          <option value="All">
            All Status
          </option>

          <option value="To Do">
            To Do
          </option>

          <option value="In Progress">
            In Progress
          </option>
<option value="Review">
  Review
</option>
          <option value="Done">
            Done
          </option>

        </select>


        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
          className="task-filter"
        >
          

          <option value="All">
            All Priority
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>
<button
  className="secondary-btn"
  onClick={() => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }}
>
  Clear Filters
</button>
      </div>


      {/* Tasks Table */}

      <div className="tasks-table-card">

        <table className="tasks-table">


          <thead>

            <tr>

              <th>Task</th>

              <th>Project</th>

              <th>Assignee</th>

              <th>Priority</th>

              <th>Deadline</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {filteredTasks.map((task) => (

              <tr key={task.id}>


                <td>

                  <div className="task-title">

                    <strong>
                      {task.title}
                    </strong>

                    <span>
                      TASK-{task.id}
                    </span>

                  </div>

                </td>


                <td>
                  {task.project}
                </td>


                <td>

                  <div className="assignee">

                    <div className="assignee-avatar">
                      {task.assignee.charAt(0)}
                    </div>

                    {task.assignee}

                  </div>

                </td>


                <td>

                  <span
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                </td>


                <td>
                  {task.deadline}
                </td>


                <td>

                  <span
                    className={`task-status-badge ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                </td>


                <td>
  {/* <button
    className="edit-btn"
    onClick={() => {
      setNewTask(task);
      setShowForm(true);
    }}
  >
    Edit
  </button> */}

  <button
    className="delete-btn"
    onClick={() => deleteTask(task.id)}
  >
    Delete
  </button>
</td>

              </tr>

            ))}


            {filteredTasks.length === 0 && (

              <tr>

                <td
                  colSpan="7"
                  className="no-tasks"
                >
                  No tasks found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


    </div>

  );

}

export default Tasks;