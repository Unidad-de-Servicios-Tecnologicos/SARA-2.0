import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';

// 🛑 Importación nombrada del router definido en routes.jsx
import { router } from './routes.jsx'; 

// 🛑 Importación correcta de RouterProvider de 'react-router-dom'
import { RouterProvider } from "react-router-dom"; 

// 👇 IMPORTAR STORES PARA INICIALIZACIÓN
import { useAuthStore } from './features/auth/store/useAuth';
import { usePermissionStore } from './features/auth/store/usePermissionStore';

// 👇 COMPONENTE WRAPPER PARA INICIALIZAR STORES
function AppWithInitialization() {
  useEffect(() => {
    // Inicializar auth desde localStorage
    useAuthStore.getState().init();
    
    // Obtener usuario y sincronizar permisos
    const user = useAuthStore.getState().user;
    if (user?.role) {
      usePermissionStore.getState().initPermissions(user.role);
    }
  }, []);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Pasamos el router con inicialización de stores */}
    <AppWithInitialization />
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