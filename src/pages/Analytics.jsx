
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTasks } from "../context/TaskContext";

function Analytics() {
  const { tasks } = useTasks();
  const projectData = [
    {
      name: "Website",
      completed: 35,
      pending: 15,
    },
    {
      name: "Mobile App",
      completed: 25,
      pending: 20,
    },
    {
      name: "CRM",
      completed: 30,
      pending: 10,
    },
    {
      name: "Analytics",
      completed: 20,
      pending: 5,
    },
  ];

  const taskTrend = [
    {
      month: "Jan",
      tasks: 20,
    },
    {
      month: "Feb",
      tasks: 35,
    },
    {
      month: "Mar",
      tasks: 45,
    },
    {
      month: "Apr",
      tasks: 60,
    },
    {
      month: "May",
      tasks: 75,
    },
    {
      month: "Jun",
      tasks: 90,
    },
  ];
const taskStatus = [
  {
    name: "Completed",
    value: tasks.filter(
      (task) => task.status === "Done"
    ).length,
  },
  {
    name: "In Progress",
    value: tasks.filter(
      (task) => task.status === "In Progress"
    ).length,
  },
  {
    name: "To Do",
    value: tasks.filter(
      (task) => task.status === "To Do"
    ).length,
  },
];
  
const completedTasks = tasks.filter(
  (task) => task.status === "Done"
).length;

const completionRate =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);
  return (
    <div className="analytics-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>
            Track project performance and task progress.
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="analytics-stats">

        <div className="analytics-stat-card">
          <span>Total Projects</span>
          <h2>25</h2>
          <p>Active projects</p>
        </div>

        <div className="analytics-stat-card">
          <span>Total Tasks</span>
          <h2>{tasks.length}</h2>
          <p>Across all projects</p>
        </div>

        <div className="analytics-stat-card">
          <span>Completed</span>
          <h2>
  {tasks.filter((task) => task.status === "Done").length}
</h2>
          <p>Tasks completed</p>
        </div>

        <div className="analytics-stat-card">
          <span>Completion Rate</span>
          <h2>67%</h2>
          <p>Overall progress</p>
        </div>

      </div>

      {/* CHART ROW 1 */}

      <div className="analytics-chart-grid">

        {/* BAR CHART */}

        <div className="chart-card">

          <div className="chart-header">
            <h3>Project Performance</h3>
            <p>Completed vs pending tasks</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="completed"
                name="Completed"
                fill="#2563eb"
              />

              <Bar
                dataKey="pending"
                name="Pending"
                fill="#94a3b8"
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}

        <div className="chart-card">

          <div className="chart-header">
            <h3>Task Status</h3>
            <p>Current task distribution</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={taskStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {taskStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#2563eb", "#f59e0b", "#94a3b8"][index]
                    }
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LINE CHART */}

      <div className="chart-card analytics-line-chart">

        <div className="chart-header">
          <h3>Task Completion Trend</h3>
          <p>Tasks completed over time</p>
        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={taskTrend}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="tasks"
              name="Completed Tasks"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;