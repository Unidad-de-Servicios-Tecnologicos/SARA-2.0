import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { DialogDescription } from "@/components/ui/DialogDescription";
import { X, ClipboardList, Save, Calendar } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";

const initialForm = {
  numero: "",
  programa: "",
  nivel: "",
  jornada: "",
  modalidad: "",
  centroFormacion: "",
  fechaInicio: "",
  fechaFin: "",
  trimestreInicial: 1,
  estadoInicial: "activa",
  cupoMaximo: "",
};

export default function CreateAcademicFichaModal({
  isOpen,
  onClose,
  onSave,
  existingCodigos = [],
  catalogos,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.numero.trim()) {
      showToast.warning("El número de ficha es obligatorio");
      return;
    }

    if (existingCodigos.includes(form.numero.trim())) {
      showToast.error("El número de ficha ya existe");
      return;
    }

    if (!form.programa) {
      showToast.warning("Seleccione un programa");
      return;
    }
    if (!form.nivel) {
      showToast.warning("Seleccione el nivel de formación");
      return;
    }
    if (!form.jornada) {
      showToast.warning("Seleccione la jornada");
      return;
    }
    if (!form.modalidad) {
      showToast.warning("Seleccione la modalidad");
      return;
    }
    if (!form.centroFormacion) {
      showToast.warning("Seleccione el centro de formación");
      return;
    }
    if (!form.fechaInicio || !form.fechaFin) {
      showToast.warning("Las fechas de inicio y fin son obligatorias");
      return;
    }
    if (!form.cupoMaximo) {
      showToast.warning("Ingrese el cupo máximo");
      return;
    }

    const confirmed = await showAlert.confirmSave(
      `Se creará la ficha ${form.numero}`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const nuevaFicha = {
        id: Date.now(),
        code: form.numero.trim(),
        program: form.programa,
        level: form.nivel,
        shift: form.jornada,
        modality: form.modalidad,
        center: form.centroFormacion,
        startDate: form.fechaInicio,
        endDate: form.fechaFin,
        currentTrimester: Number(form.trimestreInicial) || 1,
        state: form.estadoInicial === "activa" ? "EN EJECUCIÓN" : "PLANEADA",
        learnerCount: 0,
        maxCapacity: Number(form.cupoMaximo),
        availableSlots: Number(form.cupoMaximo),
        instructor: "",
        coordinator: "",
      };

      await new Promise((r) => setTimeout(r, 500));
      onSave?.(nuevaFicha);
      showToast.success("Ficha creada exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      showToast.error("Error al crear la ficha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <DialogContent className="max-w-4xl" hideCloseButton>
        <div className="w-full overflow-hidden flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between pb-4 border-b dark:border-slate-700 px-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <ClipboardList className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  Crear Nueva Ficha
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Todos los campos marcados con (*) son obligatorios.
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
            {/* Datos básicos */}
            <section>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Datos básicos de la ficha
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Número de ficha *
                  </label>
                  <input
                    type="text"
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                    placeholder="Ej: 3014407"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Programa de formación *
                  </label>
                  <select
                    name="programa"
                    value={form.programa}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    {catalogos?.programas?.map((p) => (
                      <option key={p.id} value={p.nombre}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Nivel de formación *
                  </label>
                  <select
                    name="nivel"
                    value={form.nivel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="TECNÓLOGO">Tecnólogo</option>
                    <option value="TÉCNICO">Técnico</option>
                    <option value="AUXILIAR">Auxiliar</option>
                    <option value="ESPECIALIZACIÓN">Especialización</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Jornada *
                  </label>
                  <select
                    name="jornada"
                    value={form.jornada}
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
                    Modalidad *
                  </label>
                  <select
                    name="modalidad"
                    value={form.modalidad}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="VIRTUAL">Virtual</option>
                    <option value="COMBINADA">Combinada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Centro de formación *
                  </label>
                  <select
                    name="centroFormacion"
                    value={form.centroFormacion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Seleccionar...</option>
                    {catalogos?.sedes?.map((s) => (
                      <option key={s.id} value={s.nombre}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Cupo máximo *
                  </label>
                  <input
                    type="number"
                    name="cupoMaximo"
                    value={form.cupoMaximo}
                    onChange={handleChange}
                    min={1}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </section>

            {/* Datos académicos */}
            <section>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Datos académicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Fecha inicio *
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={form.fechaInicio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    Fecha fin estimada *
                  </label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={form.fechaFin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Trimestre inicial
                  </label>
                  <select
                    name="trimestreInicial"
                    value={form.trimestreInicial}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((t) => (
                      <option key={t} value={t}>
                        Trimestre {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Estado inicial
                  </label>
                  <select
                    name="estadoInicial"
                    value={form.estadoInicial}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="activa">Activa</option>
                    <option value="planeada">Planeada</option>
                  </select>
                </div>
                <div className="md:col-span-2 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                  Los cupos disponibles se calcularán automáticamente en función del cupo máximo y los aprendices matriculados.
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
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Crear ficha
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
