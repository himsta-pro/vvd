// src/components/Tasks.js
import React from 'react';


const Tasks = () => {
  // Sample tasks data 
  const tasks = [
    {
      id: 1,
      title: "Complete project proposal",
      assignedTo: "Rahul Sharma",
      dueDate: "2024-04-15"
    },
    {
      id: 2,
      title: "Review code changes",
      assignedTo: "Priya Singh",
      dueDate: "2024-04-18"
    },
    {
      id: 3,
      title: "Team meeting preparation",
      assignedTo: "Amit Patel",
      dueDate: "2024-04-20"
    }
  ];

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.assignedTo}</td>
              <td>{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;