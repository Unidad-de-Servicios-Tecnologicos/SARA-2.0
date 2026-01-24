/**
 * ========================================
 * PÁGINA: ACCESO DENEGADO
 * ========================================
 * Se muestra cuando el usuario intenta acceder
 * a un recurso sin permisos
 */

import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/shared/notifications";

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    showToast.info('Redirigiendo al Dashboard...')
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    showToast.info('Volviendo a la página anterior...')
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-full">
            <Lock className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Acceso Denegado
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          No tienes permisos para acceder a este contenido.
        </p>

        {/* Descripción */}
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
          Tu rol actual no tiene acceso a este módulo. 
          Contacta al administrador si crees que esto es un error.
        </p>

        {/* Botones de acción */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={handleDashboardClick}
            className="bg-green-600 hover:bg-green-700"
          >
            <span>Ir al Dashboard</span>
          </Button>
          
          <Button
            onClick={handleGoBack}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        {/* Info adicional */}
        <div className="mt-8 p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-xs text-orange-700 dark:text-orange-400">
            <strong>⚠️ Seguridad:</strong> Este acceso está protegido por control de roles (RBAC).
            Todos los intentos de acceso no autorizados son registrados.
          </p>
        </div>
      </div>
    </div>
  );
}
