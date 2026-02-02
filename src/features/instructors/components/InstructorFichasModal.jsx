import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Clock,
  User,
  Trash2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { DialogTitle, DialogHeader } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { showToast } from "@/shared/notifications";
import { useFichasInstructor } from "../hooks/UseInstructors";

const getRolConfig = (rol) => {
  const configs = {
    lider: {
      label: "Líder",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
    },
    apoyo: {
      label: "Apoyo",
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-400",
    },
    titular: {
      label: "Titular",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-400",
    },
  };
  return configs[rol?.toLowerCase()] || configs.titular;
};

export default function InstructorFichasModal({
  isOpen,
  onClose,
  instructor,
  onViewSchedule,
}) {
  const { fichas, loading: loadingFichas } = useFichasInstructor(
    instructor?.id
  );
  const [removingFichaId, setRemovingFichaId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [localFichas, setLocalFichas] = useState([]);

  // Sincronizar fichas del hook con el estado local cuando cambie el instructor o la data cargada
  useEffect(() => {
    if (Array.isArray(fichas)) {
      setLocalFichas(fichas);
    } else {
      setLocalFichas([]);
    }
  }, [fichas, instructor?.id, isOpen]);

  const handleRemoveFicha = async (fichaId) => {
    setRemovingFichaId(fichaId);
    try {
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      showToast.success("Ficha removida exitosamente");
      setShowConfirm(null);
      // Actualizar listado local para que la ficha desaparezca de la tabla
      setLocalFichas((prev) => prev.filter((f) => f.id !== fichaId));
    } catch (error) {
      showToast.error("Error al remover la ficha");
    } finally {
      setRemovingFichaId(null);
    }
  };

  const totalHoras = useMemo(() => {
    return (localFichas || []).reduce(
      (sum, f) => sum + (f.horasAsignadas || 0),
      0
    );
  }, [localFichas]);

  if (!isOpen || !instructor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700">
          <div>
            <DialogTitle className="text-xl">
              Fichas Asignadas – {instructor.nombre} {instructor.apellidos}
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {fichas?.length || 0} ficha(s) asignada(s) • Total: {totalHoras}h
              semanales
            </p>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loadingFichas ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : localFichas && localFichas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      Ficha
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      Programa
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      Jornada
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Rol
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Horas
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {localFichas.map((ficha) => {
                    const rolConfig = getRolConfig(ficha.rol);
                    return (
                      <tr
                        key={ficha.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {ficha.numero}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          {ficha.programa}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                            {ficha.jornada}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${rolConfig.bg} ${rolConfig.text}`}
                          >
                            <User className="w-3 h-3" />
                            {rolConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {ficha.horasAsignadas}h
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onViewSchedule?.(ficha)}
                              className="h-8 w-8 p-0"
                              title="Ver horario"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setShowConfirm(ficha.id)}
                              disabled={removingFichaId === ficha.id}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Remover ficha"
                            >
                              {removingFichaId === ficha.id ? (
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>

                          {/* Confirmación */}
                          {showConfirm === ficha.id && (
                            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm shadow-lg">
                                <div className="flex items-start gap-4">
                                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                      ¿Remover ficha?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                      ¿Está seguro que desea remover la ficha{" "}
                                      <strong>{ficha.numero}</strong> de este instructor?
                                    </p>
                                    <div className="flex gap-3 mt-4">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setShowConfirm(null)}
                                      >
                                        Cancelar
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          handleRemoveFicha(ficha.id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                      >
                                        Remover
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Sin fichas asignadas
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
