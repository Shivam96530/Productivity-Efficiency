import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/productivity/stats');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const efficiency = stats?.efficiency || 0;
  const completionRate = stats?.totalTasks > 0 
    ? (stats.completedTasks / stats.totalTasks) * 100 
    : 0;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📊 Dashboard</h1>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Productivity Efficiency</h3>
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {efficiency.toFixed(1)}%
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(efficiency, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Total Tasks</h3>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {stats?.totalTasks || 0}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {stats?.completedTasks || 0} completed
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Completion Rate</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {completionRate.toFixed(1)}%
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(completionRate, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Time Utilization</h3>
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stats?.totalActualTime ? Math.floor(stats.totalActualTime / 60) : 0}h
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {stats?.totalPlannedTime ? Math.floor(stats.totalPlannedTime / 60) : 0}h planned
            </p>
          </div>
        </div>

        {/* Task Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Task Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">✅ Completed</span>
                <span className="font-bold text-green-600">{stats?.completedTasks || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">🔄 In Progress</span>
                <span className="font-bold text-blue-600">{stats?.inProgressTasks || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">⏳ Pending</span>
                <span className="font-bold text-yellow-600">{stats?.pendingTasks || 0}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Priority Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">🔥 High</span>
                <span className="font-bold text-red-600">{stats?.highPriorityTasks || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">⚡ Medium</span>
                <span className="font-bold text-yellow-600">{stats?.mediumPriorityTasks || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">📌 Low</span>
                <span className="font-bold text-green-600">{stats?.lowPriorityTasks || 0}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/tasks" className="block btn-primary text-center">
                ➕ Add New Task
              </Link>
              <Link to="/analytics" className="block btn-secondary text-center">
                📈 View Analytics
              </Link>
              <Link to="/time-tracking" className="block btn-secondary text-center">
                ⏱️ Time Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

