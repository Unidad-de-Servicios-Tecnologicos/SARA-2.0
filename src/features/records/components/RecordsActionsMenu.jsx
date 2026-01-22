import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Eye,
  Calendar,
  Users,
  TrendingUp,
  Briefcase,
  FileText,
  Send,
  ChevronDown,
  Clock,
  AlertCircle,
} from "lucide-react";
import { showToast } from "@/shared/notifications";

/**
 * Menú de acciones para cada ficha
 * Acciones según SARA:
 * - Ver ficha
 * - Horarios
 * - Asistencia
 * - Rendimiento académico
 * - Aprendices
 * - Prácticas
 * - Documentos
 * - Entrega de ficha
 */
export default function RecordsActionsMenu({ ficha, onViewDetail }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isAbove, setIsAbove] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const actions = [
    {
      id: "view",
      label: "Ver ficha",
      icon: Eye,
      action: () => {
        onViewDetail(ficha);
        setShowMenu(false);
      },
      color: "blue",
    },
    {
      id: "schedules",
      label: "Horarios",
      icon: Calendar,
      action: () => {
        // Navegar a horarios de la ficha - pasando el número de ficha
        navigate(`/schedules/ficha/${ficha.numero}`, { 
          state: { 
            ficha,
            initialSearchValue: ficha.numero
          } 
        });
        setShowMenu(false);
      },
      color: "purple",
    },
    {
      id: "attendance",
      label: "Asistencia",
      icon: Clock,
      action: () => {
        // Navegar a asistencia de la ficha
        navigate(`/attendance/${ficha.id}`, { state: { ficha } });
        setShowMenu(false);
      },
      color: "orange",
    },
    {
      id: "performance",
      label: "Rendimiento académico",
      icon: TrendingUp,
      action: () => {
        // Navegar a rendimiento académico
        navigate(`/learners/rendimiento/${ficha.id}`, { state: { ficha } });
        setShowMenu(false);
      },
      color: "green",
    },
    {
      id: "learners",
      label: "Aprendices",
      icon: Users,
      action: () => {
        // Navegar a aprendices de la ficha
        navigate(`/learners/${ficha.id}`, { state: { ficha } });
        setShowMenu(false);
      },
      color: "cyan",
    },
    {
      id: "practices",
      label: "Prácticas",
      icon: Briefcase,
      action: () => {
        // Navegar a prácticas de la ficha
        navigate(`/practices/ficha/${ficha.id}`, { state: { ficha } });
        setShowMenu(false);
      },
      color: "yellow",
    },
    {
      id: "documents",
      label: "Documentos",
      icon: FileText,
      action: () => {
        // Navegar a documentos de la ficha
        navigate(`/documents/${ficha.id}`, { state: { ficha } });
        setShowMenu(false);
      },
      color: "red",
    },
    {
      id: "delivery",
      label: "Entrega de ficha",
      icon: Send,
      action: async () => {
        // Mostrar confirmación con SweetAlert2
        const result = await Swal.fire({
          title: "Entrega de Ficha",
          html: `¿Confirmas la entrega de la ficha <strong>${ficha.numero}</strong>?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, entregar",
          cancelButtonText: "Cancelar",
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        if (result.isConfirmed) {
          showToast.success(`Ficha ${ficha.numero} entregada correctamente`);
          setShowMenu(false);
          // TODO: Implementar API call para entrega
        }
      },
      color: "indigo",
    },
  ];

  // Detectar si debe abrirse hacia arriba
  useEffect(() => {
    if (!showMenu || !menuRef.current || !buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const menuHeight = 350; // Altura aproximada del menú
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    
    // Si no hay espacio abajo, abre hacia arriba
    setIsAbove(spaceBelow < menuHeight);
  }, [showMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
        title="Ver acciones"
      >
        <span className="text-sm font-medium mr-1">Acciones</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${showMenu ? "rotate-180" : ""}`}
        />
      </button>

      {showMenu && (
        <div 
          className={`absolute right-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden ${
            isAbove ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
            {actions.map((action) => {
              const IconComponent = action.icon;
              const colorClasses = {
                blue: "text-blue-600 dark:text-blue-400",
                purple: "text-purple-600 dark:text-purple-400",
                orange: "text-orange-600 dark:text-orange-400",
                green: "text-green-600 dark:text-green-400",
                cyan: "text-cyan-600 dark:text-cyan-400",
                yellow: "text-yellow-600 dark:text-yellow-400",
                red: "text-red-600 dark:text-red-400",
                indigo: "text-indigo-600 dark:text-indigo-400",
              };

              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-md"
                >
                  <IconComponent className={`w-4 h-4 ${colorClasses[action.color]}`} />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Cerrar menú al hacer click fuera */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
