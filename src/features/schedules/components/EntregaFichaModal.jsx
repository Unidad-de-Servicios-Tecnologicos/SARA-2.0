import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { FileCheck, Calendar, User, ClipboardCheck, AlertCircle } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";

export default function EntregaFichaModal({ isOpen, onClose, fichaCode = "" }) {
  const [formData, setFormData] = useState({
    fechaEntrega: new Date().toISOString().split('T')[0],
    instructorSaliente: "",
    instructorEntrante: "",
    observaciones: "",
    documentosEntregados: {
      listaAprendices: false,
      horarios: false,
      planFormacion: false,
      informeAvance: false,
      materialDidactico: false
    }
  });

  const handleCheckboxChange = (key) => {
    setFormData({
      ...formData,
      documentosEntregados: {
        ...formData.documentosEntregados,
        [key]: !formData.documentosEntregados[key]
      }
    });
  };

  const handleSave = () => {
    if (!formData.instructorSaliente || !formData.instructorEntrante) {
      showAlert.warning("Campos requeridos", "Por favor complete los campos de instructor saliente y entrante.");
      return;
    }

    const dataToSave = { ...formData, fichaCode };
    
    // Cerrar el dialog primero
    onClose();
    resetForm();
    
    // Mostrar confirmación después de cerrar el dialog
    setTimeout(async () => {
      const confirmed = await showAlert.confirm(
        "Confirmar Entrega de Ficha",
        `¿Desea registrar la entrega de la ficha ${fichaCode}?`,
        "Registrar Entrega"
      );

      if (confirmed) {
        console.log("Registrando entrega de ficha:", dataToSave);
        await showAlert.success(
          "¡Entrega Registrada!",
          `La entrega de la ficha ${fichaCode} ha sido registrada correctamente.`
        );
        showToast.export("Acta de entrega PDF");
      }
    }, 100);
  };

  const resetForm = () => {
    setFormData({
      fechaEntrega: new Date().toISOString().split('T')[0],
      instructorSaliente: "",
      instructorEntrante: "",
      observaciones: "",
      documentosEntregados: {
        listaAprendices: false,
        horarios: false,
        planFormacion: false,
        informeAvance: false,
        materialDidactico: false
      }
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const documentos = [
    { key: "listaAprendices", label: "Lista de aprendices actualizada" },
    { key: "horarios", label: "Horarios de formación" },
    { key: "planFormacion", label: "Plan de formación" },
    { key: "informeAvance", label: "Informe de avance curricular" },
    { key: "materialDidactico", label: "Material didáctico" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Entrega de Ficha
              </h2>
              {fichaCode && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ficha: {fichaCode}
                </p>
              )}
            </div>
          </div>

          {/* Formulario - Scrollable */}
          <div className="space-y-4">
          {/* Fecha de entrega */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4" />
              Fecha de Entrega
            </label>
            <input
              type="date"
              value={formData.fechaEntrega}
              onChange={(e) => setFormData({ ...formData, fechaEntrega: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Instructor Saliente */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4" />
              Instructor Saliente
            </label>
            <input
              type="text"
              value={formData.instructorSaliente}
              onChange={(e) => setFormData({ ...formData, instructorSaliente: e.target.value })}
              placeholder="Nombre del instructor que entrega"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Instructor Entrante */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4" />
              Instructor Entrante
            </label>
            <input
              type="text"
              value={formData.instructorEntrante}
              onChange={(e) => setFormData({ ...formData, instructorEntrante: e.target.value })}
              placeholder="Nombre del instructor que recibe"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Documentos Entregados */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <ClipboardCheck className="w-4 h-4" />
              Documentos Entregados
            </label>
            <div className="space-y-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              {documentos.map((doc) => (
                <label key={doc.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.documentosEntregados[doc.key]}
                    onChange={() => handleCheckboxChange(doc.key)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{doc.label}</span>
                </label>
              ))}
            </div>
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
            Registrar Ficha
          </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
