import React from "react";

const ProcurementProject = () => {
  const projects = [
    {
      id: "P-001",
      name: "Swimming Pool Construction - Villa Project",
      status: "Ongoing",
      startDate: "2024-01-01",
      endDate: "2024-06-15",
    },
    {
      id: "P-002",
      name: "Landscape Design - Commercial Complex",
      status: "Completed",
      startDate: "2023-08-10",
      endDate: "2024-01-14",
    },
    {
      id: "P-003",
      name: "Site Survey - Residential Project",
      status: "Pending",
      startDate: "2024-01-05",
      endDate: "2024-01-13",
    },
  ];

  return (
    <div className="">
      {/* Page Title */}
      <h3 className="fw-bold">Projects</h3>
      <p className="text-gray-600 mb-4 sm:mb-6">
        Overview of all ongoing, pending, and completed projects.
      </p>

      {/* Responsive Table Wrapper */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm sm:text-base">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left">Project ID</th>
                <th className="px-4 sm:px-6 py-3 text-left">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left">Start Date</th>
                <th className="px-4 sm:px-6 py-3 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, index) => (
                <tr
                  key={proj.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-800">
                    {proj.id}
                  </td>
                  <td className="px-4 sm:px-6 py-4">{proj.name}</td>
                  <td
                    className={`px-4 sm:px-6 py-4 font-semibold ${
                      proj.status === "Ongoing"
                        ? "text-blue-600"
                        : proj.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {proj.status}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">
                    {proj.startDate}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">
                    {proj.endDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcurementProject;
