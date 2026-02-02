import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { FileCheck, Calendar, AlertCircle } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";

// Mock simple de instructores titulares disponibles
const instructoresTitulares = [
  "MARÍA GÓMEZ",
  "JUAN PÉREZ",
  "CLAUDIA CAMPUZANO",
  "ADOLFO LEON LOPEZ",
  "ALBEIRO OSPINA"
];

// Mock simple de programas por ficha (para mostrar etiqueta de programa)
const programasPorFicha = {
  "2818588": "GESTIÓN ADMINISTRATIVA",
  "2818589": "GESTIÓN LOGÍSTICA",
  "2818590": "CONTABILIZACIÓN DE OPERACIONES",
};

export default function EntregaFichaModal({ isOpen, onClose, fichaCode = "" }) {
  const [fichaSeleccionada, setFichaSeleccionada] = useState(fichaCode || "");
  const [formData, setFormData] = useState({
    fechaEntrega: new Date().toISOString().split("T")[0],
    instructorTitular: "",
    observaciones: "",
    actaFile: null
  });

  const entregasRef = useRef([]);

  // Mantener sincronizada la ficha mostrada con la que llega desde Gestión de Horarios
  useEffect(() => {
    if (isOpen) {
      setFichaSeleccionada(fichaCode || "");
    }
  }, [isOpen, fichaCode]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, actaFile: file }));
  };

  const handleSave = () => {
    if (!fichaSeleccionada) {
      showAlert.warning("Ficha requerida", "No se ha seleccionado una ficha para la entrega.");
      return;
    }

    if (!formData.instructorTitular) {
      showAlert.warning("Instructor requerido", "Debe seleccionar el instructor titular.");
      return;
    }

    if (!formData.fechaEntrega) {
      showAlert.warning("Fecha requerida", "Debe registrar la fecha de entrega.");
      return;
    }

    const yaEntregada = entregasRef.current.includes(fichaSeleccionada);

    if (yaEntregada) {
      showAlert.warning(
        "Entrega existente",
        `La ficha ${fichaSeleccionada} ya tiene un registro de entrega.`
      );
      return;
    }

    const dataToSave = {
      fichaCode: fichaSeleccionada,
      programa: programasPorFicha[fichaSeleccionada] || "",
      instructorTitular: formData.instructorTitular,
      fechaEntrega: formData.fechaEntrega,
      observaciones: formData.observaciones,
      actaFileName: formData.actaFile?.name || null
    };

    onClose();
    resetForm();

    setTimeout(async () => {
      const confirmed = await showAlert.confirm(
        "Confirmar Entrega de Ficha",
        `¿Desea registrar la entrega de la ficha ${fichaSeleccionada}?`,
        "Confirmar entrega"
      );

      if (confirmed) {
        entregasRef.current.push(fichaSeleccionada);
        console.log("Registrando entrega de ficha:", dataToSave);
        await showAlert.success(
          "¡Entrega Registrada!",
          `La entrega de la ficha ${fichaSeleccionada} ha sido registrada correctamente.`
        );
        showToast.export("Acta de entrega PDF");
      }
    }, 100);
  };

  const resetForm = () => {
    setFormData({
      fechaEntrega: new Date().toISOString().split("T")[0],
      instructorTitular: "",
      observaciones: "",
      actaFile: null
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const programaLabel = programasPorFicha[fichaSeleccionada] || "Programa no disponible";

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-3xl">
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Entrega de ficha
                </h2>
              </div>
            </div>

            {/* Formulario - Scrollable */}
            <div className="space-y-4">
              {/* Ficha (bloqueado) */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Ficha
                </label>
                <input
                  type="text"
                  value={fichaSeleccionada || "Sin ficha seleccionada"}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Programa (label) */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Programa
                </label>
                <input
                  type="text"
                  value={programaLabel}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                />
              </div>

              {/* Instructor titular */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Instructor titular *
                </label>
                <select
                  value={formData.instructorTitular}
                  onChange={(e) => setFormData({ ...formData, instructorTitular: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  <option value="">Seleccione un instructor</option>
                  {instructoresTitulares.map((inst) => (
                    <option key={inst} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha de entrega */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  Fecha de entrega *
                </label>
                <input
                  type="date"
                  value={formData.fechaEntrega}
                  onChange={(e) => setFormData({ ...formData, fechaEntrega: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Observaciones */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  Observaciones
                </label>
                <textarea
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Observaciones adicionales sobre la entrega..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              {/* Documento acta (opcional) */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Documento acta (opcional)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.actaFile && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Archivo seleccionado: {formData.actaFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 px-6 pb-4 border-t dark:border-gray-700 shrink-0">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              Confirmar entrega
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
