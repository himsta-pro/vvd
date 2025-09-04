import React, { useState } from "react";

const ProcurementReport = () => {
  const allReports = [
    {
      type: "Procurement Summary",
      dateRange: "2024-01-01 to 2024-03-31",
    },
    {
      type: "Supplier Performance",
      dateRange: "2024-04-01 to 2024-06-30",
    },
    {
      type: "Procurement Summary",
      dateRange: "2024-07-01 to 2024-09-30",
    },
  ];

  const [reports, setReports] = useState(allReports);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setReports(allReports);
      return;
    }

    const filtered = allReports.filter((report) => {
      const [rangeStart, rangeEnd] = report.dateRange.split(" to ");
      return (
        new Date(rangeStart) >= new Date(startDate) &&
        new Date(rangeEnd) <= new Date(endDate)
      );
    });

    setReports(filtered);
  };

  return (
    <div className="">
      {/* Page Header */}
      <h3 className="fw-bold">Reports</h3>
      <p className="text-gray-600 mb-6">
        Overview of procurement and supplier performance reports.
      </p>

      {/* Filter Section */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Filter
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Report Type</th>
              <th className="px-6 py-3 text-left">Date Range</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {report.dateRange}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No reports found for the selected range
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcurementReport;
