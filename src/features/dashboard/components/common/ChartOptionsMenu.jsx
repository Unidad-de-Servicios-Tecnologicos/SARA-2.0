import { useState, useRef, useEffect } from "react";
import { Download, Maximize2, RefreshCw, Eye } from "lucide-react";

export default function ChartOptionsMenu({ onExport, onExpand, onRefresh, onViewDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action) => {
    action?.();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Opciones del gráfico"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-1 z-50 min-w-36">
          {onViewDetails && (
            <button
              onClick={() => handleAction(onViewDetails)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Eye size={16} className="text-blue-500" />
              Ver detalles
            </button>
          )}
          {onExpand && (
            <button
              onClick={() => handleAction(onExpand)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Maximize2 size={16} className="text-purple-500" />
              Expandir
            </button>
          )}
          {onRefresh && (
            <button
              onClick={() => handleAction(onRefresh)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RefreshCw size={16} className="text-green-500" />
              Actualizar
            </button>
          )}
          {onExport && (
            <button
              onClick={() => handleAction(onExport)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Download size={16} className="text-orange-500" />
              Exportar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
