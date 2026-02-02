import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { DialogDescription } from "@/components/ui/DialogDescription";
import { X, ClipboardList, Save, Lock, Calendar } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";

const initialForm = {
  code: "",
  program: "",
  startDate: "",
  endDate: "",
  shift: "",
  modality: "",
  state: "EN EJECUCIÓN",
};

export default function EditAcademicFichaModal({ isOpen, onClose, ficha, onSave }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ficha && isOpen) {
      setForm({
        code: ficha.code || "",
        program: ficha.program || "",
        startDate: ficha.startDate || "",
        endDate: ficha.endDate || "",
        shift: ficha.shift || ficha.jornada || "",
        modality: ficha.modality || ficha.modalidad || "",
        state: ficha.state || "EN EJECUCIÓN",
      });
    }
  }, [ficha, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.endDate) {
      showToast.warning("La fecha fin estimada es obligatoria");
      return;
    }

    const confirmed = await showAlert.confirmSave(
      `Se actualizará la ficha ${form.code}`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const updated = {
        ...ficha,
        endDate: form.endDate,
        shift: form.shift,
        modality: form.modality,
        state: form.state,
      };

      await new Promise((r) => setTimeout(r, 500));
      onSave?.(updated);
      showToast.success("Ficha actualizada exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      showToast.error("Error al actualizar la ficha");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !ficha) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent className="max-w-4xl" hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between pb-4 border-b dark:border-slate-700 px-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  Editar Ficha
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Ficha {form.code}
                </DialogDescription>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-1 py-4 space-y-6">
            {/* Datos no editables */}
            <section>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Datos no editables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Número de ficha
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.code}
                      disabled
                      className="w-full px-3 py-2 pr-8 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 cursor-not-allowed"
                    />
                    <Lock className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Programa
                  </label>
                  <input
                    type="text"
                    value={form.program}
                    disabled
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Fecha inicio
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    disabled
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            {/* Datos editables */}
            <section>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Datos editables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Jornada
                  </label>
                  <select
                    name="shift"
                    value={form.shift}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Diurna">Diurna</option>
                    <option value="Nocturna">Nocturna</option>
                    <option value="Mixta">Mixta</option>
                    <option value="Fines de semana">Fines de semana</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Modalidad
                  </label>
                  <select
                    name="modality"
                    value={form.modality}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="VIRTUAL">Virtual</option>
                    <option value="COMBINADA">Combinada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Fecha fin estimada
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Estado de la ficha
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="EN EJECUCIÓN">Activa</option>
                    <option value="FINALIZADA">Finalizada</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
                <div className="md:col-span-2 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                  Cambios de estado pueden requerir validaciones adicionales (aprendices activos, seguimiento, etc.).
                </div>
              </div>
            </section>
          </form>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-slate-700 px-1 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form=""
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Guardar cambios
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
