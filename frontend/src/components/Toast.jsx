import { useEffect } from 'react';

const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' 
    ? 'bg-green-500 dark:bg-green-600' 
    : 'bg-red-500 dark:bg-red-600';

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-up">
      <div className={`${bgColor} text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2`}>
        <span>{type === 'success' ? '✅' : '⚠️'}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;

