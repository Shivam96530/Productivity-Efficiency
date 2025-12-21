import { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../components/Toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    plannedTime: '',
    actualTime: '',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        ...formData,
        plannedTime: parseInt(formData.plannedTime),
        actualTime: parseInt(formData.actualTime) || 0,
        dueDate: formData.dueDate || null
      };

      if (editingTask) {
        const response = await axios.put(`/api/tasks/${editingTask._id}`, taskData);
        if (response.data.success) {
          setToast({ message: 'Task updated successfully!', type: 'success' });
          fetchTasks();
          resetForm();
        }
      } else {
        const response = await axios.post('/api/tasks', taskData);
        if (response.data.success) {
          setToast({ message: 'Task created successfully!', type: 'success' });
          fetchTasks();
          resetForm();
        }
      }
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Error saving task', type: 'error' });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      plannedTime: task.plannedTime,
      actualTime: task.actualTime || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      if (response.data.success) {
        setToast({ message: 'Task deleted successfully!', type: 'success' });
        fetchTasks();
      }
    } catch (error) {
      setToast({ message: 'Error deleting task', type: 'error' });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      plannedTime: '',
      actualTime: '',
      dueDate: ''
    });
    setEditingTask(null);
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      default: return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-green-600 dark:text-green-400';
    }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🗂️ Task Management</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            ➕ Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first task to get started!
            </p>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Create Task
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="card hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold flex-1">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                
                {task.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {task.description}
                  </p>
                )}

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                    <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Planned:</span>
                    <span className="font-semibold">{task.plannedTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Actual:</span>
                    <span className="font-semibold">{task.actualTime || 0} min</span>
                  </div>
                  {task.dueDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Due:</span>
                      <span className="font-semibold">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="flex-1 btn-secondary text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="3"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="input-field"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Planned Time (minutes) *</label>
                  <input
                    type="number"
                    value={formData.plannedTime}
                    onChange={(e) => setFormData({ ...formData, plannedTime: e.target.value })}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Actual Time (minutes)</label>
                  <input
                    type="number"
                    value={formData.actualTime}
                    onChange={(e) => setFormData({ ...formData, actualTime: e.target.value })}
                    className="input-field"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default Tasks;

