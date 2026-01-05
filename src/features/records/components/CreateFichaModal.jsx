import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { X, ClipboardList, Save, Calendar, Users, Building2 } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";

const initialForm = {
  numero: "",
  programa: "",
  nivel: "tecnologo",
  jornada: "diurna",
  sede: "",
  aula: "",
  instructorTitular: "",
  fechaInicio: "",
  fechaFin: "",
  cupoMaximo: 30,
};

export default function CreateFichaModal({ isOpen, onClose, onSuccess, catalogos }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.numero.trim()) {
      showToast.warning("El número de ficha es obligatorio");
      return;
    }
    if (!form.programa) {
      showToast.warning("Seleccione un programa");
      return;
    }
    if (!form.fechaInicio || !form.fechaFin) {
      showToast.warning("Las fechas de inicio y fin son obligatorias");
      return;
    }
    if (!form.sede) {
      showToast.warning("Seleccione una sede");
      return;
    }

    const confirmed = await showAlert.confirmSave(
      `Se creará la ficha ${form.numero}`
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      // Simular guardado
      await new Promise((r) => setTimeout(r, 800));
      
      showToast.success("Ficha creada exitosamente");
      onSuccess?.();
      handleClose();
    } catch {
      showToast.error("Error al crear ficha");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} hideCloseButton>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ClipboardList className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Nueva Ficha
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Crear una nueva ficha de formación
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Número y Programa */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Ficha *
              </label>
              <input
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                placeholder="Ej: 2694871"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Programa *
              </label>
              <select
                name="programa"
                value={form.programa}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Seleccionar...</option>
                {catalogos?.programas?.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Nivel y Jornada */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nivel de Formación
              </label>
              <select
                name="nivel"
                value={form.nivel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="tecnologo">Tecnólogo</option>
                <option value="tecnico">Técnico</option>
                <option value="auxiliar">Auxiliar</option>
                <option value="especializacion">Especialización</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Jornada
              </label>
              <select
                name="jornada"
                value={form.jornada}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="diurna">Diurna</option>
                <option value="nocturna">Nocturna</option>
                <option value="mixta">Mixta</option>
                <option value="fines_semana">Fines de Semana</option>
              </select>
            </div>
          </div>

          {/* Sede y Aula */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Building2 className="w-4 h-4 inline mr-1" />
                Sede *
              </label>
              <select
                name="sede"
                value={form.sede}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Seleccionar...</option>
                {catalogos?.sedes?.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aula Principal
              </label>
              <input
                type="text"
                name="aula"
                value={form.aula}
                onChange={handleChange}
                placeholder="Ej: A-301"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Users className="w-4 h-4 inline mr-1" />
              Instructor Titular
            </label>
            <select
              name="instructorTitular"
              value={form.instructorTitular}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="">Seleccionar...</option>
              {catalogos?.instructores?.map((i) => (
                <option key={i.id} value={i.id}>{i.nombre}</option>
              ))}
            </select>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha Inicio *
              </label>
              <input
                type="date"
                name="fechaInicio"
                value={form.fechaInicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha Fin *
              </label>
              <input
                type="date"
                name="fechaFin"
                value={form.fechaFin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cupo Máximo
              </label>
              <input
                type="number"
                name="cupoMaximo"
                value={form.cupoMaximo}
                onChange={handleChange}
                min={1}
                max={50}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Crear Ficha
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
