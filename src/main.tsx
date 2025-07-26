//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routes/AppRouter';
import './i18n/i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <AppRouter />
  //</StrictMode>
);
