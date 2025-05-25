import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Trash, HelpCircle, RefreshCw, Moon, Sun } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { requestNotificationPermission, sendNotification } from '../utils/serviceWorker';
import { clearLocalStorage } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [notificationTime, setNotificationTime] = useState<string>('09:00');
  const [resetConfirmOpen, setResetConfirmOpen] = useState<boolean>(false);
  
  const { refreshWeather } = useWeather();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkNotificationPermission = async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setNotificationsEnabled(permission === 'granted');
      }
    };
    checkNotificationPermission();
  }, []);
  
  const handleToggleNotifications = async () => {
    const permission = await requestNotificationPermission();
    setNotificationsEnabled(permission);
    
    if (permission) {
      localStorage.setItem('notification-time', notificationTime);
      // Send a test notification
      await sendNotification('Plant Reminder', {
        body: 'Notifications are now enabled!',
        icon: '/pwa-192x192.png'
      });
    }
  };
  
  const handleResetData = () => {
    clearLocalStorage();
    setResetConfirmOpen(false);
    window.location.href = '/';
  };
  
  const handleRefreshWeather = () => {
    refreshWeather();
    alert('Weather data refreshed!');
  };
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="card mb-4 dark:bg-gray-800 dark:text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="mr-3 text-blue-500">
              <Bell size={22} />
            </div>
            <div>
              <p className="font-medium">Daily Reminders</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get plant care notifications</p>
            </div>
          </div>
          
          <button 
            onClick={handleToggleNotifications}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {notificationsEnabled && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Reminder Time
            </label>
            <input 
              type="time" 
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="input dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        )}
      </motion.div>

      <motion.div 
        className="card mb-4 dark:bg-gray-800 dark:text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 text-yellow-500">
              {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
            </div>
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode appearance</p>
            </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        className="card mb-4 dark:bg-gray-800 dark:text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Weather Data</h2>
        
        <button 
          className="flex items-center justify-between w-full py-2"
          onClick={handleRefreshWeather}
        >
          <div className="flex items-center">
            <div className="mr-3 text-blue-500">
              <RefreshCw size={22} />
            </div>
            <div>
              <p className="font-medium">Refresh Weather Data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update current weather information</p>
            </div>
          </div>
        </button>
      </motion.div>
      
      <motion.div 
        className="card mb-4 dark:bg-gray-800 dark:text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">App Data</h2>
        
        <button 
          className="flex items-center justify-between w-full py-2 text-red-500"
          onClick={() => setResetConfirmOpen(true)}
        >
          <div className="flex items-center">
            <div className="mr-3">
              <Trash size={22} />
            </div>
            <div>
              <p className="font-medium">Reset App Data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Clear all plants and settings</p>
            </div>
          </div>
        </button>
      </motion.div>
      
      <motion.div 
        className="card dark:bg-gray-800 dark:text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">About</h2>
        
        <div className="flex items-center py-2">
          <div className="mr-3 text-green-500">
            <HelpCircle size={22} />
          </div>
          <div>
            <p className="font-medium">Plant Reminder</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</p>
          </div>
        </div>
      </motion.div>
      
      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Reset All Data?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This will remove all your plants and settings. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button 
                className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => setResetConfirmOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="btn bg-red-600 text-white hover:bg-red-700"
                onClick={handleResetData}
              >
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SettingsPage;