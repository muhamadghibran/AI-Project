import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower2, Settings, ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const isSettingsPage = location.pathname === '/settings';
  const isPlantDetail = location.pathname.startsWith('/plants/');
  const isPlantSelection = location.pathname === '/plants';
  
  let title = t('common.appName');
  
  if (isSettingsPage) {
    title = t('navigation.settings');
  } else if (isPlantDetail) {
    title = t('plants.about');
  } else if (isPlantSelection) {
    title = t('navigation.plants');
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <motion.header 
      className="sticky top-0 z-10 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {(isSettingsPage || isPlantDetail || isPlantSelection) ? (
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label={t('common.back')}
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <div className="mr-3 text-green-600 animate-bloom">
              <Flower2 size={24} />
            </div>
          )}
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
          >
            {i18n.language === 'en' ? 'ID' : 'EN'}
          </button>
          
          {!isSettingsPage && (
            <button 
              onClick={() => navigate('/settings')} 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label={t('navigation.settings')}
            >
              <Settings size={22} />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;