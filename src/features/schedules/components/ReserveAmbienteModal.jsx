import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Calendar, Clock, User, BookOpen } from "lucide-react";
import { showAlert } from "@/shared/notifications";

export default function ReserveAmbienteModal({ isOpen, onClose, ambienteLabel = "" }) {
  const [formData, setFormData] = useState({
    fecha: "",
    horaInicio: "",
    horaFin: "",
    motivo: "",
    fichaOInstructor: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setFormData({ fecha: "", horaInicio: "", horaFin: "", motivo: "", fichaOInstructor: "" });
    onClose?.();
  };

  const handleSave = async () => {
    const { fecha, horaInicio, horaFin, motivo, fichaOInstructor } = formData;

    if (!fecha || !horaInicio || !horaFin || !motivo || !fichaOInstructor) {
      showAlert.warning("Campos requeridos", "Todos los campos marcados son obligatorios");
      return;
    }

    if (horaFin <= horaInicio) {
      showAlert.warning("Horario inválido", "La hora de fin debe ser mayor que la de inicio");
      return;
    }

    // Aquí iría la validación real de disponibilidad / cruces con el backend
    const confirmed = await showAlert.confirmSave("¿Registrar esta reserva de ambiente?");
    if (!confirmed) return;

    console.log("Reserva de ambiente", { ...formData, ambiente: ambienteLabel });
    handleClose();
    showAlert.success("Reserva registrada", "La reserva del ambiente se ha registrado correctamente");
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }} hideCloseButton>
      <DialogContent hideCloseButton className="max-w-3xl">
        <div className="w-full flex flex-col gap-4">
          <div className="pb-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reservar ambiente
            </h2>
            {ambienteLabel && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Ambiente: <span className="font-medium">{ambienteLabel}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => handleChange("fecha", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Ficha / Instructor *
              </label>
              <input
                type="text"
                value={formData.fichaOInstructor}
                onChange={(e) => handleChange("fichaOInstructor", e.target.value)}
                placeholder="Número de ficha o nombre del instructor"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Hora inicio *
              </label>
              <input
                type="time"
                value={formData.horaInicio}
                onChange={(e) => handleChange("horaInicio", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Hora fin *
              </label>
              <input
                type="time"
                value={formData.horaFin}
                onChange={(e) => handleChange("horaFin", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <BookOpen className="w-4 h-4 inline mr-1" />
              Motivo *
            </label>
            <textarea
              rows={3}
              value={formData.motivo}
              onChange={(e) => handleChange("motivo", e.target.value)}
              placeholder="Describa brevemente el motivo de la reserva"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
            />
          </div>

          <div className="flex justify-end pt-4 border-t dark:border-gray-700 mt-2 gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Guardar reserva
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
