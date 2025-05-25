import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Leaf, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-800 z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-3">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 rounded-md transition-colors ${
                isActive ? 'text-green-600 dark:text-green-500' : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <Home size={24} />
            <span className="text-xs mt-1">{t('navigation.home')}</span>
          </NavLink>
          
          <NavLink 
            to="/plants" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 rounded-md transition-colors ${
                isActive ? 'text-green-600 dark:text-green-500' : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <Leaf size={24} />
            <span className="text-xs mt-1">{t('navigation.plants')}</span>
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 rounded-md transition-colors ${
                isActive ? 'text-green-600 dark:text-green-500' : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <Settings size={24} />
            <span className="text-xs mt-1">{t('navigation.settings')}</span>
          </NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;