import React from "react";

const DesignerDashboard = () => {
  const statCards = [
    { title: "Pending Approvals", value: 5, change: "+2.1%", color: "primary", icon: "bi-check-circle" },
    { title: "Uploaded Drawings", value: 12, change: "+4.3%", color: "info", icon: "bi-file-earmark-arrow-up" },
  ];

  const recentTasks = [
    { id: 1, label: "Review client feedback", tag: "Task", amount: "$1,200", date: "2025-08-15" },
    { id: 2, label: "Upload revised floor plan", tag: "Drawing", amount: "$3,500", date: "2025-08-14" },
    { id: 3, label: "Check pending design approval", tag: "Approval", amount: "$800", date: "2025-08-13" },
  ];

  const quickActions = [
    { id: 1, label: "New Drawing", icon: "bi-plus-square" },
    { id: 2, label: "New Approval", icon: "bi-check2-circle" },
    { id: 3, label: "Add Task", icon: "bi-list-task" },
    { id: 4, label: "Add Resource", icon: "bi-person-plus" },
  ];

  return (
    <div className="">
      {/* Dashboard Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Dashboard</h3>
        <p className="text-muted">Overview of your design activities and key metrics.</p>
      </div>

      {/* Stat Cards */}
     <div className="row g-3 mb-4">
  {statCards.map((card, index) => (
    <div className="col-md-6" key={index}>
      <div className={`card shadow-sm border-0 bg-${card.color} bg-opacity-10`}>
        <div className="card-body d-flex align-items-center">
          <div className={`icon-box bg-${card.color} text-white rounded p-3 me-3`}>
            <i className={`bi ${card.icon} fs-3`}></i>
          </div>
          <div>
            <h6 className="mb-1 text-muted">{card.title}</h6>
            <h4 className="fw-bold mb-0">{card.value}</h4>
            <small className="text-success">{card.change}</small>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Recent Activities & Quick Actions */}
      <div className=" g-3">
        {/* Recent Activities */}
        <div className="">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-bold">Recent Activities</div>
            <ul className="list-group list-group-flush">
              {recentTasks.map((task) => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold">{task.label}</span>
                    <div className="text-muted small">{task.tag}</div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold">{task.amount}</span>
                    <div className="text-muted small">{task.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerDashboard;
