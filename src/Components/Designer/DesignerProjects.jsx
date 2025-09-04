import React from "react";

const ProjectsDashboard = () => {
  const projects = [
    {
      id: "PRJ001",
      name: "Office Interior Design",
      client: "ABC Corp",
      status: "Active",
      start: "2025-01-10",
      end: "2025-03-30",
    },
    {
      id: "PRJ002",
      name: "Mall Renovation",
      client: "XYZ Group",
      status: "Completed",
      start: "2024-08-15",
      end: "2024-12-20",
    },
    {
      id: "PRJ003",
      name: "Luxury Villa Design",
      client: "Elite Homes",
      status: "Pending",
      start: "2025-04-01",
      end: "2025-06-15",
    },
  ];

  // Status badge styling based on theme
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "badge rounded-pill bg-success";
      case "Completed":
        return "badge rounded-pill bg-primary";
      case "Pending":
        return "badge rounded-pill bg-warning text-dark";
      default:
        return "badge rounded-pill bg-secondary";
    }
  };

  return (
    <div className="">
      {/* Dashboard Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Projects</h3>
        <p className="text-muted">Overview of all ongoing, completed and pending projects.</p>
      </div>

      {/* Projects Table Card */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white fw-bold fs-5">Project Details</div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Project ID</th>
                <th scope="col">Name</th>
                <th scope="col">Client</th>
                <th scope="col">Status</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-bottom">
                  <td className="fw-bold">{project.id}</td>
                  <td>{project.name}</td>
                  <td className="text-muted">{project.client}</td>
                  <td>
                    <span className={getStatusStyle(project.status)}>
                      {project.status}
                    </span>
                  </td>
                  <td>{project.start}</td>
                  <td>{project.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDashboard;
