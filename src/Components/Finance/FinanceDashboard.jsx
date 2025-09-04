import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinanceDashboard = () => {
  // KPI Data
  const budget = "$250,000";
  const actual = "$230,000";
  const invoicesDue = "$45,230";
  const paymentsReceived = "$180,000";

  // Line Chart: Cash Flow Data
  const cashFlowData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Cash Flow",
        data: [5000, 10000, 7000, 15000, 12000, 18000],
        fill: false,
        borderColor: "#4e73df",
        tension: 0.1,
      },
    ],
  };

  // Bar Chart: Budget Utilization Data
  const budgetUtilizationData = {
    labels: ["Marketing", "Operations", "HR", "IT", "Logistics"],
    datasets: [
      {
        label: "Utilization (%)",
        data: [70, 85, 60, 90, 75],
        backgroundColor: "#1cc88a",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // charts resize properly
    plugins: {
      legend: { display: true, position: "bottom" },
    },
  };

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <h2 className="fw-bold mb-2">Finance Dashboard</h2>
      <p className="text-muted">
        Overview of financial performance and key metrics.
      </p>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm text-center p-3 bg-primary bg-opacity-10">
            <h6 className="text-muted">Budget vs Actual</h6>
            <h4 className="fw-bold">
              {budget} / {actual}
            </h4>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm text-center p-3 bg-warning bg-opacity-10">
            <h6 className="text-muted">Invoices Due</h6>
            <h4 className="fw-bold text-danger">{invoicesDue}</h4>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm text-center p-3 bg-success bg-opacity-10">
            <h6 className="text-muted">Payments Received</h6>
            <h4 className="fw-bold text-success">{paymentsReceived}</h4>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm p-3 h-100">
            <h6 className="fw-semibold mb-3">Cash Flow</h6>
            <div style={{ height: "300px" }}>
              <Line data={cashFlowData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm p-3 h-100">
            <h6 className="fw-semibold mb-3">Budget Utilization</h6>
            <div style={{ height: "300px" }}>
              <Bar data={budgetUtilizationData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
