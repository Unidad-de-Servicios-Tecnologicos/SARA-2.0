import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDashboardNav } from "../store/useDashboardNav";
import DashboardLayout from "../layout/DashboardLayout";

/**
 * Página wrapper que establece el módulo actual basado en la ruta
 * y renderiza el DashboardLayout
 */
export default function DashboardModulePage() {
  const location = useLocation();
  const setCurrentModule = useDashboardNav((s) => s.setCurrentModule);

  useEffect(() => {
    // Extraer el módulo del pathname
    // Rutas como /instructores, /horarios, etc.
    const pathname = location.pathname.substring(1); // Remover el / inicial
    if (pathname) {
      setCurrentModule(pathname);
    }
  }, [location.pathname, setCurrentModule]);

  return <DashboardLayout />;
}
