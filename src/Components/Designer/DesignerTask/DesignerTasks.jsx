import React, { useState } from "react";
import ViewTaskModal from "./ViewTaskModal";
import UpdateStatusModal from "./UpdateStatusModal";

const DesignerTasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const tasks = [
    {
      id: "TSK001",
      title: "Prepare floor plan",
      dueDate: "2025-09-10",
      priority: "High",
      status: "Pending",
    },
    {
      id: "TSK002",
      title: "Client feedback review",
      dueDate: "2025-09-15",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "TSK003",
      title: "Finalize 3D render",
      dueDate: "2025-09-20",
      priority: "Low",
      status: "Completed",
    },
  ];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning text-dark";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "In Progress":
        return "bg-info text-dark";
      case "Completed":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold">Tasks</h3>
        <p className="text-muted">
          Manage and track all your tasks efficiently.
        </p>
      </div>

      {/* Tasks Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white fw-bold fs-5">Task List</div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="fw-bold">{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <span
                      className={`badge ${getPriorityBadge(task.priority)}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn text-primary btn-sm"
                        onClick={() => handleView(task)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn text-success btn-sm"
                        onClick={() => handleUpdate(task)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showViewModal && (
        <ViewTaskModal
          task={selectedTask}
          onClose={() => setShowViewModal(false)}
        />
      )}
      {showUpdateModal && (
        <UpdateStatusModal
          task={selectedTask}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default DesignerTasks;
