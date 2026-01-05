import React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { BarChart3, TrendingUp, TrendingDown, Users, Award, AlertTriangle, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data de rendimiento académico
const mockRendimiento = {
  ficha: "2818588",
  programa: "GESTIÓN ADMINISTRATIVA",
  totalAprendices: 28,
  aprobados: 22,
  reprobados: 3,
  enProceso: 3,
  promedioGeneral: 4.2,
  asistenciaPromedio: 87,
  competenciasEvaluadas: [
    { nombre: "Gestión Documental", promedio: 4.3, aprobados: 24 },
    { nombre: "Comunicación Empresarial", promedio: 4.1, aprobados: 22 },
    { nombre: "Servicio al Cliente", promedio: 4.5, aprobados: 26 },
    { nombre: "Archivo y Correspondencia", promedio: 3.9, aprobados: 20 },
    { nombre: "Organización de Eventos", promedio: 4.0, aprobados: 21 }
  ],
  historialNotas: [
    { trimestre: "2024-1", promedio: 3.8 },
    { trimestre: "2024-2", promedio: 4.0 },
    { trimestre: "2024-3", promedio: 4.1 },
    { trimestre: "2024-4", promedio: 4.2 }
  ]
};

export default function RendimientoAcademicoModal({ isOpen, onClose, fichaCode = "" }) {
  const data = mockRendimiento;
  
  // Datos para el gráfico de pastel
  const pieData = [
    { name: "Aprobados", value: data.aprobados, color: "#22c55e" },
    { name: "Reprobados", value: data.reprobados, color: "#ef4444" },
    { name: "En Proceso", value: data.enProceso, color: "#f59e0b" }
  ];

  // Calcular tendencia
  const ultimoTrimestre = data.historialNotas[data.historialNotas.length - 1]?.promedio || 0;
  const penultimoTrimestre = data.historialNotas[data.historialNotas.length - 2]?.promedio || 0;
  const tendencia = ultimoTrimestre - penultimoTrimestre;
  const tendenciaPositiva = tendencia >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Rendimiento Académico
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ficha: {fichaCode || data.ficha} - {data.programa}
            </p>
          </div>
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-auto py-4">
          {/* KPIs principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Aprendices</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data.totalAprendices}</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Promedio General</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{data.promedioGeneral}</p>
                {tendenciaPositiva ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Asistencia</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{data.asistenciaPromedio}%</p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">En Riesgo</span>
              </div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{data.reprobados + data.enProceso}</p>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Estado de Aprendices */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Estado de Aprendices</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historial de Promedios */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Evolución del Promedio</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.historialNotas}>
                  <XAxis dataKey="trimestre" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="promedio" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla de Competencias */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Rendimiento por Competencia</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300">Competencia</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600 dark:text-gray-300">Promedio</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600 dark:text-gray-300">Aprobados</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600 dark:text-gray-300">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.competenciasEvaluadas.map((comp, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{comp.nombre}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-medium ${
                          comp.promedio >= 4.0 
                            ? 'text-green-600 dark:text-green-400' 
                            : comp.promedio >= 3.0 
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-600 dark:text-red-400'
                        }`}>
                          {comp.promedio.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-900 dark:text-gray-100">
                        {comp.aprobados}/{data.totalAprendices}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {comp.promedio >= 4.0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                            <CheckCircle className="w-3 h-3" /> Excelente
                          </span>
                        ) : comp.promedio >= 3.0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                            <AlertTriangle className="w-3 h-3" /> Regular
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs">
                            <AlertTriangle className="w-3 h-3" /> Bajo
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Dialog>
  );
}
