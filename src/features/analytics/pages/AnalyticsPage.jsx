import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { Download, TrendingUp, Users, Award, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { showToast } from '@/shared/notifications'
import { downloadExcel } from '@/utils/downloadExcel'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month')

  // Performance data
  const performanceData = [
    { name: 'Excelente (90-100)', value: 24, color: '#10b981' },
    { name: 'Bueno (80-89)', value: 35, color: '#3b82f6' },
    { name: 'Aceptable (70-79)', value: 25, color: '#f59e0b' },
    { name: 'Deficiente (<70)', value: 6, color: '#ef4444' }
  ]

  // Program completion
  const programData = [
    { program: 'Administración', completed: 18, incomplete: 7 },
    { program: 'Desarrollo Software', completed: 22, incomplete: 5 },
    { program: 'Manufactura', completed: 15, incomplete: 10 },
    { program: 'Consultoría', completed: 20, incomplete: 3 },
    { program: 'Salud', completed: 12, incomplete: 8 }
  ]

  // Attendance trend
  const attendanceData = [
    { week: 'Sem 1', attendance: 88, target: 95 },
    { week: 'Sem 2', attendance: 91, target: 95 },
    { week: 'Sem 3', attendance: 85, target: 95 },
    { week: 'Sem 4', attendance: 93, target: 95 },
    { week: 'Sem 5', attendance: 89, target: 95 }
  ]

  // Grade distribution
  const gradeData = [
    { range: '90-100', students: 24 },
    { range: '80-89', students: 35 },
    { range: '70-79', students: 25 },
    { range: '60-69', students: 10 },
    { range: '<60', students: 6 }
  ]

  // Time spent vs performance
  const correlationData = [
    { timeHours: 5, performance: 65 },
    { timeHours: 8, performance: 72 },
    { timeHours: 12, performance: 78 },
    { timeHours: 15, performance: 85 },
    { timeHours: 20, performance: 92 },
    { timeHours: 25, performance: 88 },
    { timeHours: 30, performance: 95 }
  ]

  // Metrics summary
  const metrics = {
    avgPerformance: 76.8,
    avgAttendance: 89.2,
    completionRate: 84.5,
    passRate: 94.0
  }

  const handleExport = (format) => {
    try {
      if (format === 'excel') {
        const toastId = showToast.loading('Preparando descarga de análisis...');

        // Preparar datos de análisis
        const analyticsData = [
          {
            métrica: 'Desempeño Promedio',
            valor: metrics.avgPerformance,
            unidad: '%',
            estado: metrics.avgPerformance >= 70 ? 'Satisfactorio' : 'Necesita Mejora'
          },
          {
            métrica: 'Asistencia Promedio',
            valor: metrics.avgAttendance,
            unidad: '%',
            estado: metrics.avgAttendance >= 85 ? 'Bueno' : 'Requiere Atención'
          },
          {
            métrica: 'Tasa de Finalización',
            valor: metrics.completionRate,
            unidad: '%',
            estado: metrics.completionRate >= 80 ? 'Excelente' : 'Regular'
          },
          {
            métrica: 'Tasa de Aprobación',
            valor: metrics.passRate,
            unidad: '%',
            estado: metrics.passRate >= 90 ? 'Excelente' : 'Regular'
          }
        ];

        const columns = [
          { key: 'métrica', label: 'Métrica' },
          { key: 'valor', label: 'Valor' },
          { key: 'unidad', label: 'Unidad' },
          { key: 'estado', label: 'Estado' }
        ];

        downloadExcel(
          analyticsData,
          columns,
          'Reporte de Análisis',
          `analisis_${new Date().toISOString().split('T')[0]}`,
          {
            subtitulo: 'Resumen de métricas educativas',
            fecha: new Date().toLocaleDateString('es-CO'),
            rowClassName: (row) => {
              if (row.estado === 'Excelente' || row.estado === 'Bueno' || row.estado === 'Satisfactorio') return 'bg-green-50';
              if (row.estado === 'Regular') return 'bg-yellow-50';
              return 'bg-red-50';
            }
          }
        );

        showToast.dismiss(toastId);
        showToast.success('Reporte de análisis descargado exitosamente');
      } else {
        showToast.info(`Formato ${format.toUpperCase()} no disponible en Excel`);
      }
    } catch (error) {
      console.error('Error al exportar:', error);
      showToast.error('Error al descargar el reporte');
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Módulo de Análisis</h1>
        <p className="text-slate-600">Visualiza métricas detalladas de desempeño y análisis académicos</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase">Desempeño Promedio</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.avgPerformance}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase">Asistencia Promedio</p>
              <p className="text-2xl font-bold text-green-900">{metrics.avgAttendance}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase">Tasa de Finalización</p>
              <p className="text-2xl font-bold text-purple-900">{metrics.completionRate}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase">Tasa de Aprobación</p>
              <p className="text-2xl font-bold text-amber-900">{metrics.passRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <Card className="mb-6 p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          {['week', 'month', 'semester', 'year'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                dateRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {range === 'week' ? 'Semana' : range === 'month' ? 'Mes' : range === 'semester' ? 'Semestre' : 'Año'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('PDF')}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <Download className="w-4 h-4" />
            PDF
          </Button>
          <Button
            onClick={() => handleExport('Excel')}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            <Download className="w-4 h-4" />
            Excel
          </Button>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribución de Desempeño</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Program Completion */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Finalización por Programa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={programData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Completados" />
              <Bar dataKey="incomplete" fill="#ef4444" name="Incompletos" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Attendance Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tendencia de Asistencia vs Meta</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Asistencia Real"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Meta"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Grade Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribución de Calificaciones</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#8b5cf6" name="Cantidad de Estudiantes" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Time vs Performance Correlation */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Correlación: Tiempo de Estudio vs Desempeño</h3>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timeHours"
                name="Horas de Estudio"
                label={{ value: 'Horas de Estudio', position: 'insideBottomRight', offset: -5 }}
              />
              <YAxis
                dataKey="performance"
                name="Desempeño (%)"
                label={{ value: 'Desempeño (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}
              />
              <Scatter
                name="Estudiantes"
                data={correlationData}
                fill="#3b82f6"
                shape="circle"
                radius={5}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Resumen de Indicadores Clave</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Indicador</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Valor Actual</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Meta</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Variación</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Desempeño Académico</td>
                <td className="px-6 py-4 text-sm text-slate-600">76.8%</td>
                <td className="px-6 py-4 text-sm text-slate-600">85%</td>
                <td className="px-6 py-4 text-sm text-red-600">-8.2%</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">Atencion</span>
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Asistencia</td>
                <td className="px-6 py-4 text-sm text-slate-600">89.2%</td>
                <td className="px-6 py-4 text-sm text-slate-600">95%</td>
                <td className="px-6 py-4 text-sm text-amber-600">-5.8%</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">Atencion</span>
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Tasa de Finalización</td>
                <td className="px-6 py-4 text-sm text-slate-600">84.5%</td>
                <td className="px-6 py-4 text-sm text-slate-600">90%</td>
                <td className="px-6 py-4 text-sm text-amber-600">-5.5%</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">Atencion</span>
                </td>
              </tr>
              <tr className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Tasa de Aprobación</td>
                <td className="px-6 py-4 text-sm text-slate-600">94.0%</td>
                <td className="px-6 py-4 text-sm text-slate-600">95%</td>
                <td className="px-6 py-4 text-sm text-green-600">-1.0%</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Óptimo</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
