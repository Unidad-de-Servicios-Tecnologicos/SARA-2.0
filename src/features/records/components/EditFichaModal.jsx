import React, { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { DialogTitle } from "@/components/ui/DialogTitle";
import { X, ClipboardList, Save, Calendar, Users, Building2, Lock } from "lucide-react";
import { showAlert, showToast } from "@/shared/notifications";

const initialForm = {
  numero: "",
  programa: "",
  nivel: "tecnologo",
  estado: "activa",
  jornada: "diurna",
  sede: "",
  aula: "",
  instructorTitular: "",
  fechaInicio: "",
  fechaFin: "",
  cupoMaximo: 30,
};

export default function EditFichaModal({ isOpen, onClose, ficha, onSuccess, catalogos }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ficha) {
      setForm({
        numero: ficha.numero || "",
        programa: ficha.programa?.id || "",
        nivel: ficha.nivel || "tecnologo",
        estado: ficha.estado || "activa",
        jornada: ficha.jornada || "diurna",
        sede: ficha.sede?.id || "",
        aula: ficha.aula || "",
        instructorTitular: ficha.instructorTitular?.id || "",
        fechaInicio: ficha.fechaInicio || "",
        fechaFin: ficha.fechaFin || "",
        cupoMaximo: ficha.cupoMaximo || 30,
      });
    }
  }, [ficha]);

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

    const confirmed = await showAlert.confirmSave(
      `Se actualizará la información de la ficha ${form.numero}`
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      // Simular guardado
      await new Promise((r) => setTimeout(r, 800));
      
      showToast.success("Ficha actualizada exitosamente");
      onSuccess?.();
      onClose();
    } catch {
      showToast.error("Error al actualizar ficha");
    } finally {
      setLoading(false);
    }
  };

  if (!ficha) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} hideCloseButton>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>
          Editar Ficha
        </DialogTitle>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-700 gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shrink-0">
              <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                Ficha {ficha.numero}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Número y Programa */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Ficha 🔒
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="numero"
                  value={form.numero}
                  disabled
                  title="El número de ficha no puede modificarse una vez creada"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                No editable - Identificador único
              </p>
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

          {/* Nivel y Estado */}
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
                Estado
              </label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="activa">Activa</option>
                <option value="en_formacion">En Formación</option>
                <option value="en_etapa_productiva">Etapa Productiva</option>
                <option value="suspendida">Suspendida</option>
                <option value="finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          {/* Jornada y Sede */}
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Building2 className="w-4 h-4 inline mr-1" />
                Sede
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
          </div>

          {/* Aula e Instructor */}
          <div className="grid grid-cols-2 gap-4">
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
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
