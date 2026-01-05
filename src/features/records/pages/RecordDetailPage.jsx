import React from "react";
import { ArrowLeft } from "lucide-react";
import RecordInfo from "../components/RecordInfo";
import { useFichaDetail } from "../hooks/UseRecords";
import { useDashboardNav } from "@/features/dashboard/store/useDashboardNav";

export default function RecordDetailPage({ fichaId }) {
  const { ficha, loading, error } = useFichaDetail(fichaId);
  const setCurrentModule = useDashboardNav((s) => s.setCurrentModule);

  const handleBack = () => {
    setCurrentModule("fichas");
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={handleBack}
          className="mt-4 text-blue-600 hover:underline"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con botón de volver */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Detalle de Ficha
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Información completa de la ficha de formación
          </p>
        </div>
      </div>

      {/* Contenido */}
      <RecordInfo ficha={ficha} loading={loading} />
    </div>
  );
}
