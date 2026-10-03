import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import App from './App';
import './index.css';

// Initialize particles engine FIRST, before mounting React DOM
initParticlesEngine(async (engine) => {
  await loadSlim(engine);
}).then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );
});
