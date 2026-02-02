import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { FileText, Send, Calendar, User } from "lucide-react";
import { showToast } from "@/shared/notifications";

export default function ObservationModal({ isOpen, onClose, learner }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!learner) return null;

  const currentObservations = [
    {
      id: 1,
      title: "Progreso académico",
      description: "Aprendiz muestra buen desempeño en módulos de programación",
      date: "2024-01-20",
      author: "Ing. María García",
    },
    {
      id: 2,
      title: "Asistencia",
      description: "Faltó sin justificación a 2 sesiones",
      date: "2024-01-18",
      author: "Ing. Ana Martínez",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      showToast.warning("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      showToast.success(`Observación registrada para ${learner.name}`);
      setTitle("");
      setDescription("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Observaciones de {learner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Observaciones Registradas */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Observaciones Registradas
            </h4>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {currentObservations.map((obs) => (
                <div
                  key={obs.id}
                  className="p-3.5 bg-white dark:bg-gray-800 border-l-4 border-l-blue-500 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {obs.title}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {obs.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {obs.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {obs.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario Nueva Observación */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              Registrar Nueva Observación
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Título
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Progreso académico"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Descripción
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Escribe tu observación aquí..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Registrar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
