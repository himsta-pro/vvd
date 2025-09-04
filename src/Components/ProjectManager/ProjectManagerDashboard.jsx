import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ProjectManagerDashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    assignedProjects: 0,
    tasksInProgress: 0,
    pendingInvoices: 0
  });

  // Sample data for charts
  const taskProgressData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: [
          '#4caf50',
          '#2196f3',
          '#ff9800'
        ],
        borderWidth: 0
      }
    ]
  };

  const budgetBurnRateData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Planned Budget',
        data: [10, 20, 40, 60, 80, 100],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Actual Spending',
        data: [15, 25, 35, 70, 85, 95],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Options for charts
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Task Progress'
      }
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Budget Burn Rate'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      }
    }
  };

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setDashboardData({
        assignedProjects: 12,
        tasksInProgress: 24,
        pendingInvoices: 7
      });
    }, 500);
  }, []);

  return (
    <div className="">
      <div className="row mb-4">
        <div className="col">
          <h3 className="fw-bold">Project Manager Dashboard</h3>
          <p className="text-muted">Monitor your project performance and metrics</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card bg-primary bg-opacity-10 shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Assigned Projects</h6>
                  <h3 className="card-title text-primary">{dashboardData.assignedProjects}</h3>
                </div>
                <div className="bg-primary p-3 rounded">
                  <i className="bi bi-folder-plus text-white fs-4"></i>
                </div>
              </div>
              <p className="card-text text-muted small">Total projects assigned to you</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-warning bg-opacity-10 shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Tasks in Progress</h6>
                  <h3 className="card-title text-warning">{dashboardData.tasksInProgress}</h3>
                </div>
                <div className="bg-warning p-3 rounded">
                  <i className="bi bi-list-task text-white fs-4"></i>
                </div>
              </div>
              <p className="card-text text-muted small">Tasks currently being worked on</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-danger bg-opacity-10 shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Pending Invoices</h6>
                  <h3 className="card-title text-danger">{dashboardData.pendingInvoices}</h3>
                </div>
                <div className="bg-danger p-3 rounded">
                  <i className="bi bi-receipt text-white fs-4"></i>
                </div>
              </div>
              <p className="card-text text-muted small">Invoices awaiting approval or payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        {/* Pie Chart */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100 d-flex justify-content-center align-items-center">
            <div className="card-body d-flex justify-content-center">
              {/* Responsive container */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "350px",  // limits max size on large screens
                  aspectRatio: "1 / 1" // keeps it square
                }}
              >
                <Pie data={taskProgressData} options={pieOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div style={{ width: "100%", height: "100%", minHeight: "250px" }}>
                <Line data={budgetBurnRateData} options={lineOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectManagerDashboard;