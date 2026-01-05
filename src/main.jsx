import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';

// 🛑 Importación nombrada del router definido en routes.jsx
import { router } from './routes.jsx'; 

// 🛑 Importación correcta de RouterProvider de 'react-router-dom'
import { RouterProvider } from "react-router-dom"; 

// 🛑 Eliminamos: La definición de rutas que causaba conflicto
// Eliminamos: import App from './App.jsx' y la definición local de 'router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Pasamos el router completo que contiene Landing, Login, y Dashboard */}
    <RouterProvider router={router} />
    {/* Sistema de notificaciones Toast */}
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '10px',
          padding: '12px 16px',
        },
      }}
    />
  </StrictMode>,
);