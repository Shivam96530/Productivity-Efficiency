import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Deriving Productivity Efficiency
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Track your tasks, measure your efficiency, and boost your productivity with our powerful MERN Stack application
          </p>
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track planned vs actual time for each task
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get detailed insights into your productivity
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set and track your performance goals
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

