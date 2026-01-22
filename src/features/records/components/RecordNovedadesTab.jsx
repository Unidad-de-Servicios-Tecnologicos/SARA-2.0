import React, { useState } from "react";
import { 
  Bell, 
  Plus,
  Calendar,
  User,
  AlertTriangle,
  UserMinus,
  RefreshCw,
  FileText,
  Clock
} from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { showAlert, showToast } from "@/shared/notifications";
import { useRecordsMutations } from "../hooks/UseRecords";

// Helper para obtener config de tipo de novedad
const getTipoNovedadConfig = (tipo) => {
  const config = {
    desercion: { color: "red", label: "Deserción", icon: UserMinus },
    cambio_instructor: { color: "blue", label: "Cambio de Instructor", icon: RefreshCw },
    suspension: { color: "yellow", label: "Suspensión", icon: AlertTriangle },
    inicio_fase: { color: "green", label: "Inicio de Fase", icon: Clock },
    fin_fase: { color: "purple", label: "Fin de Fase", icon: Clock },
    otro: { color: "gray", label: "Otro", icon: FileText },
  };
  return config[tipo] || { color: "gray", label: tipo, icon: Bell };
};

// Formatear fecha
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

// Modal para agregar novedad
function AddNovedadModal({ isOpen, onClose, fichaId, onSuccess }) {
  const [formData, setFormData] = useState({
    tipo: "",
    descripcion: "",
  });
  
  const { registrarNovedad, loading } = useRecordsMutations();

  const tiposNovedad = [
    { id: "desercion", label: "Deserción" },
    { id: "cambio_instructor", label: "Cambio de Instructor" },
    { id: "suspension", label: "Suspensión" },
    { id: "inicio_fase", label: "Inicio de Fase" },
    { id: "fin_fase", label: "Fin de Fase" },
    { id: "otro", label: "Otro" },
  ];

  const handleSubmit = async () => {
    if (!formData.tipo) {
      showAlert.warning("Campo requerido", "Seleccione un tipo de novedad");
      return;
    }
    if (!formData.descripcion.trim()) {
      showAlert.warning("Campo requerido", "Ingrese una descripción");
      return;
    }

    try {
      await registrarNovedad(fichaId, {
        ...formData,
        fecha: new Date().toISOString().split('T')[0],
        usuario: "Usuario Actual",
      });
      
      showToast.success("Novedad registrada exitosamente");
      setFormData({ tipo: "", descripcion: "" });
      onClose();
      onSuccess?.();
    } catch (error) {
      showToast.error("Error al registrar novedad");
    }
  };

  const handleCancel = () => {
    setFormData({ tipo: "", descripcion: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <div className="w-full max-w-4xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Registrar Novedad
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tipo de Novedad
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccione...</option>
              {tiposNovedad.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describa la novedad..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t dark:border-gray-700">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
            Registrar
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default function RecordNovedadesTab({ novedades, loading, fichaId }) {
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500 dark:text-gray-400">Cargando novedades...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header con botón de agregar */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Historial de Novedades
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Agregar Novedad
        </button>
      </div>

      {/* Timeline de novedades */}
      <div className="relative">
        {novedades.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-500 dark:text-gray-400">
            No hay novedades registradas
          </div>
        ) : (
          <div className="space-y-4">
            {novedades.map((novedad, index) => {
              const tipoConfig = getTipoNovedadConfig(novedad.tipo);
              const Icon = tipoConfig.icon;
              
              return (
                <div 
                  key={novedad.id}
                  className="flex gap-4"
                >
                  {/* Línea de timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full bg-${tipoConfig.color}-100 dark:bg-${tipoConfig.color}-900/30 flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 text-${tipoConfig.color}-600 dark:text-${tipoConfig.color}-400`} />
                    </div>
                    {index < novedades.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 my-2" />
                    )}
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1 pb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-${tipoConfig.color}-100 dark:bg-${tipoConfig.color}-900/30 text-${tipoConfig.color}-700 dark:text-${tipoConfig.color}-300`}>
                          {tipoConfig.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(novedad.fecha)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {novedad.descripcion}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Registrado por: {novedad.usuario}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal para agregar novedad */}
      <AddNovedadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        fichaId={fichaId}
      />
    </div>
  );
}
