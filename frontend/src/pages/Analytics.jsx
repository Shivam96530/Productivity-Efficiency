import { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [daily, setDaily] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [overall, setOverall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [dailyRes, weeklyRes, overallRes] = await Promise.all([
        axios.get('/api/productivity/daily'),
        axios.get('/api/productivity/weekly'),
        axios.get('/api/productivity/overall')
      ]);

      if (dailyRes.data.success) setDaily(dailyRes.data.data);
      if (weeklyRes.data.success) setWeekly(weeklyRes.data.data);
      if (overallRes.data.success) setOverall(overallRes.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📈 Analytics & Reports</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Daily Efficiency */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">📅 Daily Efficiency</h3>
              <span className="text-3xl">📊</span>
            </div>
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {daily?.efficiency?.toFixed(1) || 0}%
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                <span className="font-semibold">
                  {daily?.completedTasks || 0} / {daily?.totalTasks || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                <span className="font-semibold">
                  {formatTime(daily?.totalActualTime || 0)} / {formatTime(daily?.totalPlannedTime || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Efficiency */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">📆 Weekly Efficiency</h3>
              <span className="text-3xl">📈</span>
            </div>
            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-4">
              {weekly?.efficiency?.toFixed(1) || 0}%
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                <span className="font-semibold">
                  {weekly?.completedTasks || 0} / {weekly?.totalTasks || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                <span className="font-semibold">
                  {formatTime(weekly?.totalActualTime || 0)} / {formatTime(weekly?.totalPlannedTime || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Efficiency */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">🎯 Overall Efficiency</h3>
              <span className="text-3xl">🔥</span>
            </div>
            <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-4">
              {overall?.efficiency?.toFixed(1) || 0}%
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                <span className="font-semibold">
                  {overall?.completedTasks || 0} / {overall?.totalTasks || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                <span className="font-semibold">
                  {formatTime(overall?.totalActualTime || 0)} / {formatTime(overall?.totalPlannedTime || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency Formula Explanation */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">📐 Efficiency Calculation</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
            <p className="text-lg mb-2">
              <strong>Efficiency Formula:</strong>
            </p>
            <p className="text-xl font-mono mb-4">
              Efficiency (%) = (Completed Actual Time / Total Planned Time) × 100
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• <strong>Completed Actual Time:</strong> Sum of actual time spent on completed tasks</p>
              <p>• <strong>Total Planned Time:</strong> Sum of planned time for all tasks</p>
              <p>• Higher efficiency means you're completing tasks within or under planned time</p>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">⏱️ Time Utilization</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Planned Time</span>
                  <span className="font-semibold">{formatTime(overall?.totalPlannedTime || 0)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Actual Time</span>
                  <span className="font-semibold">{formatTime(overall?.totalActualTime || 0)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      (overall?.totalActualTime || 0) > (overall?.totalPlannedTime || 1)
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        ((overall?.totalActualTime || 0) / (overall?.totalPlannedTime || 1)) * 100,
                        100
                      )}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">✅ Task Completion</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Total Tasks</span>
                  <span className="font-semibold">{overall?.totalTasks || 0}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Completed Tasks</span>
                  <span className="font-semibold">{overall?.completedTasks || 0}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${overall?.totalTasks > 0
                        ? (overall.completedTasks / overall.totalTasks) * 100
                        : 0}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

