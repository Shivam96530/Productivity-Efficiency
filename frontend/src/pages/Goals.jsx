import { useState, useEffect } from 'react';
import axios from 'axios';

const Goals = () => {
  const [overall, setOverall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetEfficiency, setTargetEfficiency] = useState(80);

  useEffect(() => {
    fetchData();
    const savedTarget = localStorage.getItem('targetEfficiency');
    if (savedTarget) {
      setTargetEfficiency(parseInt(savedTarget));
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/productivity/overall');
      if (response.data.success) {
        setOverall(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTargetChange = (e) => {
    const value = parseInt(e.target.value);
    setTargetEfficiency(value);
    localStorage.setItem('targetEfficiency', value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentEfficiency = overall?.efficiency || 0;
  const progress = Math.min((currentEfficiency / targetEfficiency) * 100, 100);
  const isAchieved = currentEfficiency >= targetEfficiency;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎯 Goals & Performance</h1>

        {/* Main Goal Card */}
        <div className="card mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Efficiency Goal</h2>
              <p className="text-purple-100">Set your target productivity efficiency</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold mb-2">
                {currentEfficiency.toFixed(1)}%
              </div>
              <p className="text-purple-100">Current Efficiency</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">Target Efficiency:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={targetEfficiency}
                  onChange={handleTargetChange}
                  className="w-48"
                />
                <span className="text-2xl font-bold w-16">{targetEfficiency}%</span>
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-4 mb-2">
              <div
                className="bg-white h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Progress: {progress.toFixed(1)}%</span>
              <span>
                {isAchieved ? (
                  <span className="font-bold">🎉 Goal Achieved!</span>
                ) : (
                  <span>Need {((targetEfficiency - currentEfficiency) / targetEfficiency * 100).toFixed(1)}% more</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {overall?.completedTasks || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completed Tasks</div>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {overall?.totalTasks || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Tasks</div>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-2">⏱️</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {overall?.totalPlannedTime ? Math.floor(overall.totalPlannedTime / 60) : 0}h
            </div>
            <div className="text-gray-600 dark:text-gray-400">Planned Time</div>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {overall?.totalActualTime ? Math.floor(overall.totalActualTime / 60) : 0}h
            </div>
            <div className="text-gray-600 dark:text-gray-400">Actual Time</div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">💡 Performance Insights</h2>
          <div className="space-y-4">
            {currentEfficiency >= targetEfficiency ? (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    Excellent Performance!
                  </h3>
                </div>
                <p className="text-green-700 dark:text-green-300">
                  You're exceeding your efficiency goal! Keep up the great work.
                </p>
              </div>
            ) : currentEfficiency >= targetEfficiency * 0.8 ? (
              <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-500 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">📈</span>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                    Good Progress
                  </h3>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300">
                  You're close to your goal! Focus on completing tasks within planned time.
                </p>
              </div>
            ) : (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-500 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="font-semibold text-red-800 dark:text-red-200">
                    Needs Improvement
                  </h3>
                </div>
                <p className="text-red-700 dark:text-red-300">
                  Try to better estimate task times and focus on completing tasks more efficiently.
                </p>
              </div>
            )}

            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-500 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                💪 Tips to Improve Efficiency
              </h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                <li>Break down large tasks into smaller, manageable chunks</li>
                <li>Set realistic time estimates for tasks</li>
                <li>Focus on one task at a time</li>
                <li>Review and adjust your time estimates based on actual performance</li>
                <li>Prioritize high-value tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;

