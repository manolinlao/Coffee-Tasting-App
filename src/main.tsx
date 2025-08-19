import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './router/AppRouter';
import './i18n/i18n';
import './index.css';
import './api/linkModels';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
