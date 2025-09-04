import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  MoreVertical
} from "lucide-react";

const QualityDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const dashboardStats = {
    openIssues: 12,
    closedIssues: 45,
    pendingInspections: 8
  };

  const recentSnags = [
    {
      id: 1,
      title: "Fire extinguisher not properly mounted",
      location: "Warehouse A - Rack 5",
      severity: "high",
      status: "open",
      reportedBy: "John Smith",
      date: "2024-01-15",
      priority: "urgent"
    },
    {
      id: 2,
      title: "Emergency exit blocked by storage",
      location: "Main Building - Floor 2",
      severity: "high",
      status: "in-progress",
      reportedBy: "Sarah Johnson",
      date: "2024-01-14",
      priority: "high"
    },
    {
      id: 3,
      title: "First aid kit needs replenishment",
      location: "Administration Office",
      severity: "medium",
      status: "open",
      reportedBy: "Mike Wilson",
      date: "2024-01-13",
      priority: "medium"
    },
    {
      id: 4,
      title: "PPE not properly stored",
      location: "Production Line 3",
      severity: "low",
      status: "closed",
      reportedBy: "Lisa Brown",
      date: "2024-01-12",
      priority: "low"
    },
    {
      id: 5,
      title: "Slip hazard near loading dock",
      location: "Loading Bay",
      severity: "high",
      status: "open",
      reportedBy: "David Lee",
      date: "2024-01-11",
      priority: "urgent"
    }
  ];

  const filteredSnags = recentSnags.filter(snag => {
    const matchesSearch = snag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snag.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || snag.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Heading + Subtext */}
        <div>
          <h3 className="fw-bold">Dashboard</h3>
          <p className="text-sm text-gray-600">
            Overview of safety management activities
          </p>
        </div>

        {/* Button */}
        <button className="btn btn-primary inline-flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4" />
          <span>Report Issue</span>
        </button>
      </div>


      <main className="">
        {/* Stats Cards - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Open Issues */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">Open Issues</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">{dashboardStats.openIssues}</h3>
                <p className="text-xs text-blue-600 mt-1">+2 today</p>
              </div>
              <div className="bg-blue-500 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Closed Issues */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-800 uppercase tracking-wide">Closed</p>
                <h3 className="text-2xl font-bold text-green-900 mt-1">{dashboardStats.closedIssues}</h3>
                <p className="text-xs text-green-600 mt-1">95% rate</p>
              </div>
              <div className="bg-green-500 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Pending Inspections */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-800 uppercase tracking-wide">Pending</p>
                <h3 className="text-2xl font-bold text-purple-900 mt-1">{dashboardStats.pendingInspections}</h3>
                <p className="text-xs text-purple-600 mt-1">Due this week</p>
              </div>
              <div className="bg-purple-500 p-2 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Snags & Quick Actions */}
        <div className="">
          {/* Recent Snags List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Snags & Issues</h4>

              {/* Search & Filter - Stacked on Mobile */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search issues or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Snags List */}
            <div className="divide-y divide-gray-100">
              {filteredSnags.length > 0 ? (
                filteredSnags.map((snag) => (
                  <div key={snag.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <h6 className="text-sm font-semibold text-gray-800 leading-tight">{snag.title}</h6>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${getPriorityColor(snag.priority)} bg-opacity-10`}>
                          {snag.priority}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                        <span className={`px-2 py-1 rounded ${getSeverityColor(snag.severity)} font-medium`}>
                          {snag.severity}
                        </span>
                        <span><strong>📍</strong> {snag.location}</span>
                        <span><strong>👤</strong> {snag.reportedBy}</span>
                        <span><strong>📅</strong> {new Date(snag.date).toLocaleDateString()}</span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded ${getStatusColor(snag.status)}`}>
                          {snag.status.replace('-', ' ')}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <AlertTriangle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No issues found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QualityDashboard;