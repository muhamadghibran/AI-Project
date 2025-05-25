import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

// Import fungsi inisialisasi service worker
import { initServiceWorker } from './utils/serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Jalankan service worker
initServiceWorker();