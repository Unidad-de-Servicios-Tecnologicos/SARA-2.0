import { X, TrendingUp, TrendingDown, Users, FileText, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useDashboardNav } from "../../store/useDashboardNav";

// Mapeo de categorías a módulos
const categoryToModule = {
  "Instructores por tipo de contrato": "instructors",
  "Instructores por género": "instructors",
  "Aprendices por estado de formación": "aprendices",
  "Aprendices activos por programa": "aprendices",
  "Fichas por programa": "fichas",
};

// Datos de ejemplo para el drill-down
const getDetailedData = (categoryName, item) => {
  // Usar parámetros para generar valores basados en seed
  const seed = (categoryName?.length || 1) + (item?.length || 1);
  const monthlyTrend = [
    { month: "Ene", value: 20 + seed * 3 },
    { month: "Feb", value: 25 + seed * 2 },
    { month: "Mar", value: 30 + seed * 4 },
    { month: "Abr", value: 35 + seed * 1 },
    { month: "May", value: 40 + seed * 5 },
    { month: "Jun", value: 45 + seed * 2 },
  ];

  const breakdown = [
    { name: "Activo", value: 10 + seed * 2 },
    { name: "Inactivo", value: 5 + seed },
    { name: "Pendiente", value: 2 + seed },
    { name: "Completado", value: 15 + seed * 3 },
  ];

  return { monthlyTrend, breakdown };
};

export default function DrillDownModal({ isOpen, onClose, data }) {
  const setModule = useDashboardNav((s) => s.setCurrentModule);

  if (!isOpen || !data) return null;

  const { category, itemName, value, color } = data;
  const detailedData = getDetailedData(category, itemName);

  // Calcular tendencia
  const trend = detailedData.monthlyTrend;
  const lastValue = trend[trend.length - 1]?.value || 0;
  const prevValue = trend[trend.length - 2]?.value || 0;
  const percentChange = prevValue ? (((lastValue - prevValue) / prevValue) * 100).toFixed(1) : 0;
  const isUp = lastValue >= prevValue;

  // Navegar al módulo completo
  const handleViewFullModule = () => {
    const module = categoryToModule[category] || "dashboard";
    setModule(module);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div 
          className="p-6 text-white"
          style={{ backgroundColor: color || "#3b82f6" }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{category}</h2>
              <p className="text-white/80 text-lg">{itemName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* KPIs del detalle */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-white/70 text-sm">Total Actual</p>
              <p className="text-3xl font-bold">{value?.toLocaleString() || "N/A"}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-white/70 text-sm">Variación</p>
              <div className="flex items-center gap-2">
                {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span className="text-2xl font-bold">{percentChange}%</span>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-white/70 text-sm">Último Mes</p>
              <p className="text-3xl font-bold">{lastValue}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de tendencia */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={18} />
                Tendencia Mensual
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={detailedData.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color || "#3b82f6"} 
                    strokeWidth={3}
                    dot={{ fill: color || "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Desglose */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Users size={18} />
                Desglose por Estado
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={detailedData.breakdown} layout="vertical">
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="name" type="category" width={80} fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb"
                    }} 
                  />
                  <Bar dataKey="value" fill={color || "#3b82f6"} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla de detalles */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FileText size={18} />
              Detalle de Registros
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-600">
                    <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Estado</th>
                    <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">Cantidad</th>
                    <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedData.breakdown.map((item, idx) => {
                    const total = detailedData.breakdown.reduce((acc, i) => acc + i.value, 0);
                    const pct = ((item.value / total) * 100).toFixed(1);
                    return (
                      <tr key={idx} className="border-b dark:border-gray-600">
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{item.name}</td>
                        <td className="px-4 py-3 text-right text-gray-800 dark:text-gray-200">{item.value}</td>
                        <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{pct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={handleViewFullModule}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ver Módulo Completo
          </button>
        </div>
      </div>
    </div>
  );
}
