import { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../components/Toast';

const TimeTracking = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (activeTask && intervalId) {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [activeTask, intervalId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      if (response.data.success) {
        setTasks(response.data.tasks.filter(t => t.status !== 'completed'));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTracking = (task) => {
    if (activeTask && activeTask._id === task._id) {
      // Stop tracking
      stopTracking();
    } else {
      // Start new tracking
      if (activeTask) {
        stopTracking();
      }
      setActiveTask(task);
      setTimeElapsed(task.actualTime || 0);
      setIntervalId(Date.now());
    }
  };

  const stopTracking = async () => {
    if (!activeTask) return;

    try {
      const newActualTime = timeElapsed;
      await axios.put(`/api/tasks/${activeTask._id}`, {
        actualTime: newActualTime
      });
      setToast({ message: 'Time tracked successfully!', type: 'success' });
      fetchTasks();
    } catch (error) {
      setToast({ message: 'Error saving time', type: 'error' });
    }

    setActiveTask(null);
    setTimeElapsed(0);
    setIntervalId(null);
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
        <h1 className="text-4xl font-bold mb-8">⏱️ Time Tracking</h1>

        {activeTask && (
          <div className="card mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Currently Tracking</h2>
                <p className="text-xl">{activeTask.title}</p>
                <p className="text-blue-100 mt-2">
                  Planned: {formatTime(activeTask.plannedTime)} | 
                  Actual: {formatTime(timeElapsed)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-2">{formatTime(timeElapsed)}</div>
                <button
                  onClick={stopTracking}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-xl transition-colors"
                >
                  Stop Tracking
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <div className="col-span-full card text-center py-12">
              <div className="text-6xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">No active tasks</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create tasks to start tracking time
              </p>
            </div>
          ) : (
            tasks.map((task) => {
              const isActive = activeTask?._id === task._id;
              return (
                <div
                  key={task._id}
                  className={`card ${isActive ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <h3 className="text-xl font-semibold mb-4">{task.title}</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Planned Time:</span>
                      <span className="font-semibold">{formatTime(task.plannedTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Actual Time:</span>
                      <span className="font-semibold">{formatTime(task.actualTime || 0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          (task.actualTime || 0) > task.plannedTime
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min(((task.actualTime || 0) / task.plannedTime) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => startTracking(task)}
                    className={`w-full ${
                      isActive
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'btn-primary'
                    } font-semibold py-3 px-6 rounded-xl transition-colors`}
                  >
                    {isActive ? '⏸️ Stop Tracking' : '▶️ Start Tracking'}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default TimeTracking;

