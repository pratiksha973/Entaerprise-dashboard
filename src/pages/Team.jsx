import { useState  , useEffect} from "react";

function Team() {

  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("projectflow_members");

    if (savedMembers) {
      return JSON.parse(savedMembers);
    }
  return [ 
    {
      id: 1,
      name: "Pratiksha",
      role: "Frontend Developer",
      email: "pratiksha@example.com",
      department: "Engineering",
      status: "Active",
      tasks: 12,
    },
    {
      id: 2,
      name: "Rahul",
      role: "Backend Developer",
      email: "rahul@example.com",
      department: "Engineering",
      status: "Active",
      tasks: 18,
    },
    {
      id: 3,
      name: "Sneha",
      role: "UI/UX Designer",
      email: "sneha@example.com",
      department: "Design",
      status: "Active",
      tasks: 9,
    },
    {
      id: 4,
      name: "Amit",
      role: "Project Manager",
      email: "amit@example.com",
      department: "Management",
      status: "Active",
      tasks: 15,
    },
    {
      id: 5,
      name: "Sakshi",
      role: "Data Analyst",
      email: "sakshi@example.com",
      department: "Analytics",
      status: "Inactive",
      tasks: 6,
    },
    {
      id: 6,
      name: "Rohan",
      role: "QA Engineer",
      email: "rohan@example.com",
      department: "Engineering",
      status: "Active",
      tasks: 11,
    },
  ];
});

  // SAVE MEMBERS TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "projectflow_members",
      JSON.stringify(members)
    );

  }, [members]);

const [search, setSearch] = useState("");
const [department, setDepartment] = useState("All");

  const deleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || member.department === department;

    return matchesSearch && matchesDepartment;
  });

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const departments = new Set(
    members.map((member) => member.department)
  ).size;

  const totalTasks = members.reduce(
    (total, member) => total + member.tasks,
    0
  );

  return (
    <div className="team-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Team Management</h1>
          <p>Manage your team members and their responsibilities.</p>
        </div>

        <button className="primary-btn" >
          + Add Member
        </button>
      </div>

      {/* STATS */}
      <div className="team-stats">

        <div className="team-stat-card">
          <span>Total Members</span>
          <h2>{members.length}</h2>
        </div>

        <div className="team-stat-card">
          <span>Active Members</span>
          <h2>{activeMembers}</h2>
        </div>

        <div className="team-stat-card">
          <span>Departments</span>
          <h2>{departments}</h2>
        </div>

        <div className="team-stat-card">
          <span>Total Tasks</span>
          <h2>{totalTasks}</h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="team-toolbar">

        <input
          type="text"
          placeholder="Search team members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Management">Management</option>
          <option value="Analytics">Analytics</option>
        </select>

      </div>

      {/* TEAM CARDS */}
      <div className="team-grid">

        {filteredMembers.length === 0 ? (
          <div className="team-empty">
            No team members found.
          </div>
        ) : (
          filteredMembers.map((member) => (

            <div className="team-card" key={member.id}>

              <div className="team-card-top">

                <div className="team-avatar">
                  {member.name.charAt(0)}
                </div>

                <span
                  className={
                    member.status === "Active"
                      ? "member-active"
                      : "member-inactive"
                  }
                >
                  {member.status}
                </span>

              </div>

              <div className="team-member-info">

                <h3>{member.name}</h3>

                <p>{member.role}</p>

                <span>{member.email}</span>

              </div>

              <div className="team-member-details">

                <div>
                  <small>Department</small>
                  <strong>{member.department}</strong>
                </div>

                <div>
                  <small>Tasks</small>
                  <strong>{member.tasks}</strong>
                </div>

              </div>

              <button
                className="delete-member-btn"
                onClick={() => deleteMember(member.id)}
              >
                Delete Member
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Team;