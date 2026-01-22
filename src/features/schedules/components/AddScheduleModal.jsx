import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { showToast, showAlert } from "@/shared/notifications";

export default function AddScheduleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    competencia: "",
    ambiente: "",
    horaInicio: "",
    horaFin: "",
    actividades: [""]
  });
  const [actividadesExpanded, setActividadesExpanded] = useState(true);

  const handleAddActivity = () => {
    setFormData({
      ...formData,
      actividades: [...formData.actividades, ""]
    });
  };

  const handleRemoveActivity = (index) => {
    const newActividades = formData.actividades.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      actividades: newActividades.length > 0 ? newActividades : [""]
    });
  };

  const handleActivityChange = (index, value) => {
    const newActividades = [...formData.actividades];
    newActividades[index] = value;
    setFormData({
      ...formData,
      actividades: newActividades
    });
  };

  const handleDownload = async () => {
    // Validar campos requeridos
    if (!formData.competencia.trim()) {
      showAlert.warning("Campo requerido", "Debe ingresar la competencia");
      return;
    }
    if (!formData.ambiente.trim()) {
      showAlert.warning("Campo requerido", "Debe ingresar el ambiente de formación");
      return;
    }
    if (!formData.horaInicio) {
      showAlert.warning("Campo requerido", "Debe ingresar la hora de inicio");
      return;
    }
    if (!formData.horaFin) {
      showAlert.warning("Campo requerido", "Debe ingresar la hora de finalización");
      return;
    }
    const actividadesValidas = formData.actividades.filter(a => a.trim());
    if (actividadesValidas.length === 0) {
      showAlert.warning("Campo requerido", "Debe agregar al menos una actividad");
      return;
    }

    const dataToSave = { ...formData, actividades: actividadesValidas };
    
    try {
      const { ExportService } = await import("@/features/instructors/services/ExportService");
      await ExportService.exportPlanTrabajoPDF(dataToSave);
      
      // Cerrar el dialog después de exportar
      onClose();
      showToast.success("Plan de trabajo exportado correctamente");
    } catch (error) {
      showToast.error("Error al exportar el plan de trabajo");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      competencia: "",
      ambiente: "",
      horaInicio: "",
      horaFin: "",
      actividades: [""]
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="pb-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Plan de trabajo
          </h2>
        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Competencia
            </label>
            <input
              type="text"
              value={formData.competencia}
              onChange={(e) => setFormData({ ...formData, competencia: e.target.value })}
              placeholder="Ingrese la competencia"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ambiente de formación
            </label>
            <input
              type="text"
              value={formData.ambiente}
              onChange={(e) => setFormData({ ...formData, ambiente: e.target.value })}
              placeholder="Ingrese el ambiente"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hora de inicio
              </label>
              <input
                type="time"
                value={formData.horaInicio}
                onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hora de finalización
              </label>
              <input
                type="time"
                value={formData.horaFin}
                onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Actividades - Sección desplegable */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setActividadesExpanded(!actividadesExpanded)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Actividades ({formData.actividades.filter(a => a.trim()).length} agregadas)
              </span>
              <div className="flex items-center gap-2">
                <span
                  onClick={(e) => { e.stopPropagation(); handleAddActivity(); }}
                  className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </span>
                {actividadesExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>
            
            {actividadesExpanded && (
              <div className="p-3 space-y-2 bg-white dark:bg-gray-800">
                {formData.actividades.map((actividad, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 shrink-0 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={actividad}
                      onChange={(e) => handleActivityChange(index, e.target.value)}
                      placeholder={`Descripción de la actividad ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                    {formData.actividades.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveActivity(index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Eliminar actividad"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {formData.actividades.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                    No hay actividades. Haga clic en "Agregar" para añadir una.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Descargar plan de trabajo
          </button>
        </div>
      </div>
    </Dialog>
  );
}
