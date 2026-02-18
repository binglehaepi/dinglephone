import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { PhoneProvider } from './context/PhoneContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PhoneProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PhoneProvider>
  </React.StrictMode>
);
