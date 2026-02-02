import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Calendar,
  Clock,
  BookOpen,
  Filter,
  Award,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockActividadesInstructor } from "../mock/instructors.mock";

const getTipoConfig = (tipo) => {
  const configs = {
    clase: {
      label: "Clase",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
    },
    practica: {
      label: "Práctica",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
    },
    proyecto: {
      label: "Proyecto",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-400",
    },
    evaluacion: {
      label: "Evaluación",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-400",
    },
    taller: {
      label: "Taller",
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-700 dark:text-pink-400",
    },
    consulta: {
      label: "Consulta",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-400",
    },
  };
  return configs[tipo?.toLowerCase()] || configs.clase;
};

const formatDate = (date) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

export default function InstructorActivitiesModal({
  isOpen,
  onClose,
  instructor,
}) {
  const [filterFicha, setFilterFicha] = useState("todas");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  // Obtener actividades del instructor
  const actividades = mockActividadesInstructor[instructor?.id] || [];

  // Extraer fichas únicas para el filtro
  const fichasUnicas = useMemo(() => {
    const fichas = [...new Set(actividades.map((a) => a.ficha))];
    return fichas.sort();
  }, [actividades]);

  // Filtrar actividades
  const actividadesFiltradas = useMemo(() => {
    return actividades.filter((actividad) => {
      // Filtro por ficha
      if (filterFicha !== "todas" && actividad.ficha !== filterFicha) {
        return false;
      }

      // Filtro por rango de fechas
      if (filterDateFrom && new Date(actividad.fecha) < new Date(filterDateFrom)) {
        return false;
      }
      if (filterDateTo && new Date(actividad.fecha) > new Date(filterDateTo)) {
        return false;
      }

      return true;
    });
  }, [actividades, filterFicha, filterDateFrom, filterDateTo]);

  // Estadísticas
  const stats = {
    total: actividadesFiltradas.length,
    horasTotal: actividadesFiltradas.reduce((sum, a) => sum + a.horas, 0),
  };

  const initials = `${instructor?.nombre?.charAt(0) || ""}${
    instructor?.apellidos?.charAt(0) || ""
  }`.toUpperCase();

  if (!isOpen || !instructor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shrink-0">
              {initials}
            </div>
            <div>
              <DialogTitle className="text-xl">
                Actividades – {instructor.nombre} {instructor.apellidos}
              </DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stats.total} actividade(s) • {stats.horasTotal}h totales
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Filtros */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter className="w-4 h-4" />
            Filtros
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Filtro por Ficha */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Por Ficha
              </label>
              <select
                value={filterFicha}
                onChange={(e) => setFilterFicha(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todas las fichas</option>
                {fichasUnicas.map((ficha) => (
                  <option key={ficha} value={ficha}>
                    Ficha {ficha}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Fecha Desde */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Desde
              </label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por Fecha Hasta */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Hasta
              </label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tabla de Actividades */}
        <div className="flex-1 overflow-y-auto">
          {actividadesFiltradas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      Ficha
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      Competencia
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      RAP
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Horas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {actividadesFiltradas.map((actividad) => {
                    const tipoConfig = getTipoConfig(actividad.tipo);
                    return (
                      <tr
                        key={actividad.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatDate(actividad.fecha)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {actividad.ficha}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-xs">
                            <p className="text-gray-900 dark:text-white text-sm">
                              {actividad.competencia}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {actividad.programa}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                            <Award className="w-3 h-3" />
                            {actividad.rap}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${tipoConfig.bg} ${tipoConfig.text}`}
                          >
                            {tipoConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {actividad.horas}h
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No hay actividades que coincidan con los filtros
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
