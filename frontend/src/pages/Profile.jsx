import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Toast from '../components/Toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const response = await axios.put('/api/user/profile', formData);
      if (response.data.success) {
        setToast({ message: 'Profile updated successfully!', type: 'success' });
        // Refresh page to update user context
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Error updating profile',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">👤 Profile & Settings</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">📧 Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Theme Settings */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Switch between light and dark mode
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-2xl"
                >
                  {theme === 'dark' ? '🌞' : '🌙'}
                </button>
              </div>
            </div>

            {/* Account Info */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                  <span className="font-mono text-sm">{user?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Theme:</span>
                  <span className="font-semibold capitalize">{theme}</span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-2 border-red-200 dark:border-red-800">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                ⚠️ Danger Zone
              </h2>
              <button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
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

export default Profile;

