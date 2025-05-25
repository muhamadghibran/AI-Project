import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { motion } from 'framer-motion';
import { CloudRain, CloudSun, Sun, Droplets, Download, X } from 'lucide-react';
import { setupInstallPrompt } from '../../utils/serviceWorker';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  // State untuk install prompt
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [showInstallPromptFunc, setShowInstallPromptFunc] = useState<(() => Promise<boolean>) | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    // Setup install prompt sekali saja
    const installPrompt = setupInstallPrompt();
    setCanInstall(installPrompt?.canInstall ?? false);
    setShowInstallPromptFunc(() => installPrompt?.showInstallPrompt ?? null);
  }, []);

  useEffect(() => {
    const hasClosedBanner = localStorage.getItem('install-banner-closed');

    if (!hasClosedBanner && canInstall) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  const handleInstallApp = async () => {
    if (!showInstallPromptFunc) return;
    setIsInstalling(true);

    try {
      const installed = await showInstallPromptFunc();

      if (installed) {
        setShowInstallBanner(false);
        localStorage.setItem('install-banner-closed', 'true');
      }
    } catch (error) {
      console.error('Error saat install:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const closeBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('install-banner-closed', 'true');
  };

  return (
    <div className="min-h-screen relative">
      {/* PWA Install Banner */}
      {showInstallBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 shadow-lg"
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌱</div>
              <div>
                <p className="font-medium text-sm">Install Plant Care App</p>
                <p className="text-xs opacity-90">Akses cepat tanpa browser</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallApp}
                disabled={isInstalling}
                className="flex items-center gap-1 bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <Download size={16} />
                {isInstalling ? 'Installing...' : 'Install'}
              </button>
              <button
                onClick={closeBanner}
                className="p-1 hover:bg-green-400 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Animated weather elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 text-blue-300 opacity-40"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
          }}
        >
          <CloudSun size={64} />
        </motion.div>

        <motion.div
          className="absolute top-24 left-16 text-blue-400 opacity-30"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: 'easeInOut',
          }}
        >
          <CloudRain size={48} />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-24 text-yellow-400 opacity-30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 60,
              ease: 'linear',
            },
            scale: {
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
            },
          }}
        >
          <Sun size={56} />
        </motion.div>

        <motion.div
          className="absolute bottom-48 left-12 text-blue-500 opacity-40"
          animate={{
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: 'easeInOut',
          }}
        >
          <Droplets size={40} />
        </motion.div>
      </div>

      {!isWelcomePage && <Header />}

      <main className={`pt-4 pb-20 ${showInstallBanner ? 'mt-16' : ''}`}>
        {children}
      </main>

      {!isWelcomePage && <Navigation />}
    </div>
  );
};

export default Layout;
