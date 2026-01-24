import { useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Search, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/card'
import { showToast } from '@/shared/notifications'
import { downloadExcel } from '@/utils/downloadExcel'

export default function AcademicPerformancePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLearner, setSelectedLearner] = useState(null)

  // Mock data
  const learners = [
    {
      id: 1,
      document: '1234567890',
      name: 'Juan Carlos López',
      fichaId: '2818588',
      state: 'EN FORMACIÓN',
      performanceRating: 'Bueno',
      attendance: 95,
      judgments: {
        approved: 65,
        pending: 10,
        notApproved: 25
      },
      stateDistribution: [
        { name: 'EN FORMACIÓN', value: 85 },
        { name: 'CANCELADO', value: 15 }
      ]
    },
    {
      id: 2,
      document: '9876543210',
      name: 'María Rodríguez García',
      fichaId: '2818588',
      state: 'EN FORMACIÓN',
      performanceRating: 'Excelente',
      attendance: 100,
      judgments: {
        approved: 90,
        pending: 0,
        notApproved: 10
      },
      stateDistribution: [
        { name: 'EN FORMACIÓN', value: 95 },
        { name: 'OTROS', value: 5 }
      ]
    }
  ]

  const searchResults = learners.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.document.includes(searchQuery)
  )

  const COLORS = ['#10b981', '#f59e0b', '#ef4444']

  const handleDownloadPerformance = () => {
    try {
      if (searchResults.length === 0) {
        showToast.info('Sin resultados', 'No hay aprendices para descargar');
        return;
      }

      const toastId = showToast.loading('Preparando reporte de desempeño...');

      // Preparar datos de desempeño académico
      const performanceData = searchResults.map(learner => ({
        documento: learner.document,
        nombre: learner.name,
        ficha: learner.fichaId,
        estado: learner.state,
        desempeño: learner.performanceRating,
        asistencia: `${learner.attendance}%`,
        aprobados: learner.judgments.approved,
        pendientes: learner.judgments.pending,
        noAprobados: learner.judgments.notApproved
      }));

      const columns = [
        { key: 'documento', label: 'Documento' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'ficha', label: 'Ficha' },
        { key: 'estado', label: 'Estado' },
        { key: 'desempeño', label: 'Desempeño' },
        { key: 'asistencia', label: 'Asistencia' },
        { key: 'aprobados', label: 'Aprobados' },
        { key: 'pendientes', label: 'Pendientes' },
        { key: 'noAprobados', label: 'No Aprobados' }
      ];

      downloadExcel(
        performanceData,
        columns,
        'Reporte de Rendimiento Académico',
        `desempenio_${new Date().toISOString().split('T')[0]}`,
        {
          subtitulo: 'Análisis de desempeño de aprendices',
          fecha: new Date().toLocaleDateString('es-CO'),
          rowClassName: (row) => {
            if (row.desempeño === 'Excelente') return 'bg-green-50';
            if (row.desempeño === 'Bueno') return 'bg-blue-50';
            if (row.desempeño === 'Regular') return 'bg-yellow-50';
            return 'bg-red-50';
          }
        }
      );

      showToast.dismiss(toastId);
      showToast.success(`Reporte de ${searchResults.length} aprendices descargado`);
    } catch (error) {
      console.error('Error al descargar:', error);
      showToast.error('Error al descargar el reporte');
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rendimiento Académico</h1>
        <p className="text-slate-600 dark:text-gray-400">Consulta el rendimiento y evaluaciones de aprendices</p>
      </div>

        {/* Búsqueda */}
        <Card className="mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Buscar aprendiz por nombre o documento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Descargar Reporte
            </Button>
          </div>
        </Card>

        {/* Lista de Aprendices o Detalle */}
        {!selectedLearner ? (
          <div className="grid gap-4">
            {searchResults.map((learner) => (
              <Card
                key={learner.id}
                className="p-6 cursor-pointer hover:shadow-lg transition bg-white"
                onClick={() => setSelectedLearner(learner)}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Documento</p>
                    <p className="font-semibold text-slate-900">{learner.document}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Nombre</p>
                    <p className="font-semibold text-slate-900">{learner.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Ficha</p>
                    <p className="font-semibold text-slate-900">{learner.fichaId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Estado</p>
                    <p className="font-semibold text-blue-600">{learner.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Desempeño</p>
                    <p className={`font-semibold ${
                      learner.performanceRating === 'Excelente' ? 'text-green-600' :
                      learner.performanceRating === 'Bueno' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                      {learner.performanceRating}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            {/* Header del Detalle */}
            <Button
              variant="outline"
              onClick={() => setSelectedLearner(null)}
              className="mb-6"
            >
              ← Volver a la Lista
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información del Aprendiz */}
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información del Aprendiz</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Nombre</p>
                    <p className="font-semibold text-slate-900">{selectedLearner.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Documento</p>
                    <p className="font-semibold text-slate-900">{selectedLearner.document}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Ficha</p>
                    <p className="font-semibold text-slate-900">{selectedLearner.fichaId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Estado de Formación</p>
                    <p className="font-semibold text-blue-600">{selectedLearner.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Desempeño Académico</p>
                    <p className={`font-semibold text-lg ${
                      selectedLearner.performanceRating === 'Excelente' ? 'text-green-600' :
                      selectedLearner.performanceRating === 'Bueno' ? 'text-blue-600' : 'text-yellow-600'
                    }`}>
                      {selectedLearner.performanceRating}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Asistencia a Formación</p>
                    <p className="font-semibold text-slate-900">{selectedLearner.attendance}%</p>
                  </div>
                </div>
              </Card>

              {/* Gráfico de Juicios */}
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Porcentaje de Evaluación de Juicios</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'APROBADO', value: selectedLearner.judgments.approved },
                    { name: 'POR EVALUAR', value: selectedLearner.judgments.pending },
                    { name: 'NO APROBADO', value: selectedLearner.judgments.notApproved }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Gráfico de Estado de Formación */}
            <Card className="mt-6 p-6 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Cantidad de Aprendices por Estado de Formación</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={selectedLearner.stateDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {selectedLearner.stateDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Tabla de Resultados de Aprendizaje */}
            <Card className="mt-6 p-6 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Resultados de Aprendizaje (RAPs)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-2 text-left font-semibold text-slate-900">Palabra Clave</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-900">Norma de Competencia</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-900">Competencia</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-900">RAP</th>
                      <th className="px-4 py-2 text-left font-semibold text-slate-900">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-2">Competencia Técnica</td>
                      <td className="px-4 py-2">CT-001</td>
                      <td className="px-4 py-2">Análisis de Procesos</td>
                      <td className="px-4 py-2">Identifica procesos clave en la organización</td>
                      <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Aprobado</span></td>
                    </tr>
                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-2">Competencia Comportamental</td>
                      <td className="px-4 py-2">CC-002</td>
                      <td className="px-4 py-2">Trabajo en Equipo</td>
                      <td className="px-4 py-2">Colabora efectivamente en equipos multidisciplinarios</td>
                      <td className="px-4 py-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">En Evaluación</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Botón de Descarga */}
            <div className="mt-6">
              <Button onClick={handleDownloadPerformance} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Descargar Reporte Completo
              </Button>
            </div>
          </div>
        )}
    </div>
  )
}
