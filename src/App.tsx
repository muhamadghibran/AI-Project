import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/layout/Layout';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import PlantSelectionPage from './pages/PlantSelectionPage';
import PlantDetailPage from './pages/PlantDetailPage';
import SettingsPage from './pages/SettingsPage';

// Context providers
import { WeatherProvider } from './context/WeatherContext';
import { PlantsProvider } from './context/PlantsContext';
import { ThemeProvider } from './context/ThemeContext';

import { initServiceWorker } from './utils/serviceWorker';

function App() {
  useEffect(() => {
    initServiceWorker();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <WeatherProvider>
          <PlantsProvider>
            <Layout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/plants" element={<PlantSelectionPage />} />
                  <Route path="/plants/:id" element={<PlantDetailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </AnimatePresence>
            </Layout>
          </PlantsProvider>
        </WeatherProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;