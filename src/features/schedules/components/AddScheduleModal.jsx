import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { showToast, showAlert } from "@/shared/notifications";

// Mock simple de datos para selects
const competenciasMock = [
  "Desarrollo de software",
  "Gestión administrativa",
  "Gestión logística",
  "Contabilización de operaciones"
];

const rapMock = [
  "Implementar soluciones de software",
  "Organizar documentación",
  "Planear rutas de abastecimiento",
  "Registrar hechos económicos"
];

const ambientesMock = [
  "Ambiente 401 - Software",
  "Ambiente 210 - Gestión",
  "Laboratorio TIC",
  "Aula 305"
];

export default function AddScheduleModal({ isOpen, onClose, fichaCode = "", instructorName = "" }) {
  const [formData, setFormData] = useState({
    ficha: fichaCode || "",
    instructor: instructorName || "",
    fecha: "",
    competencia: "",
    rap: "",
    ambiente: "",
    horaInicio: "",
    horaFin: "",
    actividadesPlaneadas: "",
    evidencia: "",
  });

  // Mantener sincronizados ficha e instructor con lo que llega desde Gestión de Horarios
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        ficha: fichaCode || "",
        instructor: instructorName || "",
      }));
    }
  }, [isOpen, fichaCode, instructorName]);

  const handleDownload = async () => {
    // Validar campos requeridos
    if (!formData.ficha.trim()) {
      showAlert.warning("Campo requerido", "Debe tener una ficha seleccionada.");
      return;
    }

    if (!formData.instructor.trim()) {
      console.warn("Plan de trabajo sin instructor asociado explícito");
    }

    if (!formData.fecha) {
      showAlert.warning("Campo requerido", "Debe ingresar la fecha del horario");
      return;
    }
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
    if (!formData.rap.trim()) {
      showAlert.warning("Campo requerido", "Debe seleccionar el resultado de aprendizaje (RAP)");
      return;
    }
    if (!formData.actividadesPlaneadas.trim()) {
      showAlert.warning("Campo requerido", "Debe registrar las actividades planeadas");
      return;
    }
    if (!formData.evidencia.trim()) {
      showAlert.warning("Campo requerido", "Debe registrar la evidencia");
      return;
    }

    if (formData.horaInicio && formData.horaFin && formData.horaFin <= formData.horaInicio) {
      showAlert.warning("Horas inválidas", "La hora de fin debe ser mayor a la hora de inicio.");
      return;
    }

    const actividadesArray = formData.actividadesPlaneadas
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a);

    const dataToSave = {
      ...formData,
      ficha: formData.ficha,
      instructor: formData.instructor,
      actividades: actividadesArray,
    };
    
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
      fecha: "",
      competencia: "",
      rap: "",
      ambiente: "",
      horaInicio: "",
      horaFin: "",
      actividadesPlaneadas: "",
      evidencia: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-5xl">
        <div className="w-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Plan de trabajo
            </h2>
          </div>

          {/* Form */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {/* Ficha e Instructor (bloqueados) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ficha
              </label>
              <input
                type="text"
                value={formData.ficha || "Sin ficha seleccionada"}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor || "Instructor titular de la ficha"}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Competencia *
              </label>
              <select
                value={formData.competencia}
                onChange={(e) => setFormData({ ...formData, competencia: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione una competencia</option>
                {competenciasMock.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                RAP *
              </label>
              <select
                value={formData.rap}
                onChange={(e) => setFormData({ ...formData, rap: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un RAP</option>
                {rapMock.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ambiente *
              </label>
              <select
                value={formData.ambiente}
                onChange={(e) => setFormData({ ...formData, ambiente: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                <option value="">Seleccione un ambiente</option>
                {ambientesMock.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hora inicio *
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
                Hora fin *
              </label>
              <input
                type="time"
                value={formData.horaFin}
                onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actividades planeadas *
            </label>
            <textarea
              rows={3}
              value={formData.actividadesPlaneadas}
              onChange={(e) => setFormData({ ...formData, actividadesPlaneadas: e.target.value })}
              placeholder="Describa las actividades que se desarrollarán en la sesión"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg.focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Evidencia *
            </label>
            <textarea
              rows={3}
              value={formData.evidencia}
              onChange={(e) => setFormData({ ...formData, evidencia: e.target.value })}
              placeholder="Describa la evidencia o producto esperado de las actividades"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
            />
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
      </DialogContent>
    </Dialog>
  );
}
