import React from "react";

const ProjectsPage = () => {
  const projects = [
    {
      id: "PRJ-001",
      name: "Villa Construction",
      contractValue: "$500,000",
      budgetUtilization: "70%",
    },
    {
      id: "PRJ-002",
      name: "Commercial Complex",
      contractValue: "$1,200,000",
      budgetUtilization: "65%",
    },
    {
      id: "PRJ-003",
      name: "Residential Towers",
      contractValue: "$900,000",
      budgetUtilization: "80%",
    },
  ];

  return (
    <div className="">
      {/* Page Title */}
      <div className="mb-4">
        <h3 className="fw-bold">Projects</h3>
        <p className="text-muted">
          Overview of all projects and their financial details.
        </p>
      </div>

      {/* Projects Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Project List</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Project ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Contract Value</th>
                  <th scope="col">Budget Utilization</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.contractValue}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="progress flex-grow-1 me-2"
                          style={{ height: "8px" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: project.budgetUtilization }}
                            aria-valuenow={parseInt(
                              project.budgetUtilization.replace("%", "")
                            )}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <span>{project.budgetUtilization}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
