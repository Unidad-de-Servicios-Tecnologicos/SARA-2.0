import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Eye, BarChart3, TrendingUp, CheckCircle2, AlertCircle, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/Input'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { showToast, showAlert } from '@/shared/notifications'

export default function MonitoringPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  const [monitoringRecords, setMonitoringRecords] = useState([
    {
      id: 1,
      type: 'Aprendiz',
      name: 'Juan Carlos Rodríguez',
      document: '1098765432',
      fichaCode: 'FIC-2024-001',
      program: 'Administración de Empresas',
      attendance: 92,
      academicPerformance: 85,
      practiceProgress: 100,
      lastUpdate: '2025-01-20',
      status: 'En Progreso',
      notes: 'Desempeño excelente en prácticas',
      visits: 12,
      issues: 0
    },
    {
      id: 2,
      type: 'Aprendiz',
      name: 'María Elena García López',
      document: '1087654321',
      fichaCode: 'FIC-2024-002',
      program: 'Desarrollo de Software',
      attendance: 88,
      academicPerformance: 78,
      practiceProgress: 85,
      lastUpdate: '2025-01-19',
      status: 'En Progreso',
      notes: 'Requiere refuerzo en conceptos avanzados',
      visits: 8,
      issues: 1
    },
    {
      id: 3,
      type: 'Instructor',
      name: 'Miguel Ángel Castaño',
      document: '1034567890',
      program: 'Administración de Empresas',
      learnerCount: 25,
      classesGiven: 48,
      averageRating: 4.5,
      lastUpdate: '2025-01-18',
      status: 'Activo',
      notes: 'Evaluación positiva de los aprendices',
      activitiesScheduled: 8
    },
    {
      id: 4,
      type: 'Aprendiz',
      name: 'Roberto Sánchez Moreno',
      document: '1076543210',
      fichaCode: 'FIC-2024-003',
      program: 'Manufactura',
      attendance: 95,
      academicPerformance: 92,
      practiceProgress: 100,
      lastUpdate: '2025-01-20',
      status: 'Completado',
      notes: 'Excelente desempeño en todas las áreas',
      visits: 15,
      issues: 0
    }
  ])

  const [formData, setFormData] = useState({
    type: 'Aprendiz',
    name: '',
    document: '',
    program: '',
    notes: ''
  })
  const [editingId, setEditingId] = useState(null)

  // Filter records
  const filteredRecords = monitoringRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.document.includes(searchTerm) ||
      record.program.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || record.type === filterType
    return matchesSearch && matchesType
  })

  // Statistics
  const stats = {
    totalRecords: monitoringRecords.length,
    learners: monitoringRecords.filter(r => r.type === 'Aprendiz').length,
    instructors: monitoringRecords.filter(r => r.type === 'Instructor').length,
    active: monitoringRecords.filter(r => r.status === 'En Progreso').length
  }

  // Chart data for learner progress
  const progressData = [
    { name: 'Asistencia', avg: 93.75, target: 95 },
    { name: 'Desempeño Académico', avg: 83.75, target: 90 },
    { name: 'Progreso Práctica', avg: 92.5, target: 100 }
  ]

  // Attendance trend
  const attendanceTrend = [
    { week: 'Sem 1', attendance: 90 },
    { week: 'Sem 2', attendance: 92 },
    { week: 'Sem 3', attendance: 89 },
    { week: 'Sem 4', attendance: 94 },
    { week: 'Sem 5', attendance: 93 }
  ]

  // Handle save
  const handleSaveRecord = () => {
    if (!formData.name || !formData.document || !formData.program) {
      showAlert.warning('Por favor completa los campos requeridos')
      return
    }

    if (editingId) {
      setMonitoringRecords(monitoringRecords.map(r =>
        r.id === editingId ? { ...r, ...formData, lastUpdate: new Date().toISOString().split('T')[0] } : r
      ))
      setEditingId(null)
    } else {
      const newRecord = {
        id: Math.max(...monitoringRecords.map(r => r.id), 0) + 1,
        ...formData,
        lastUpdate: new Date().toISOString().split('T')[0],
        status: 'En Progreso',
        attendance: 85,
        academicPerformance: 80,
        practiceProgress: 75,
        visits: 0,
        issues: 0
      }
      setMonitoringRecords([newRecord, ...monitoringRecords])
    }

    setFormData({ type: 'Aprendiz', name: '', document: '', program: '', notes: '' })
    setShowForm(false)
  }

  // Handle edit
  const handleEdit = (record) => {
    setFormData(record)
    setEditingId(record.id)
    setShowForm(true)
    setSelectedRecord(null)
  }

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      setMonitoringRecords(monitoringRecords.filter(r => r.id !== id))
      setSelectedRecord(null)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'En Progreso': return 'bg-blue-100 text-blue-800'
      case 'Completado': return 'bg-green-100 text-green-800'
      case 'Activo': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Seguimiento y Control</h1>
        <p className="text-slate-600 dark:text-gray-400">Monitorea el progreso de aprendices e instructores</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase">Total Registros</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalRecords}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase">Aprendices</p>
              <p className="text-2xl font-bold text-purple-900">{stats.learners}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase">En Progreso</p>
              <p className="text-2xl font-bold text-green-900">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase">Instructores</p>
              <p className="text-2xl font-bold text-amber-900">{stats.instructors}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Promedios vs Metas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill="#3b82f6" name="Promedio Actual" />
              <Bar dataKey="target" fill="#10b981" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tendencia de Asistencia (Últimas 5 semanas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#3b82f6" name="% Asistencia" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search and Filters */}
          <Card className="mb-6 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre, documento o programa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'Aprendiz', 'Instructor'].map(type => (
                  <Button
                    key={type}
                    variant={filterType === type ? 'default' : 'outline'}
                    onClick={() => setFilterType(type)}
                    size="sm"
                  >
                    {type === 'all' ? 'Todos' : type}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => {
                  setShowForm(!showForm)
                  setEditingId(null)
                  setFormData({ type: 'Aprendiz', name: '', document: '', program: '', notes: '' })
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nuevo Registro
              </Button>
            </div>
          </Card>

          {/* Form */}
          {showForm && (
            <Card className="mb-6 p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {editingId ? 'Editar Registro' : 'Nuevo Registro de Seguimiento'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tipo *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Aprendiz">Aprendiz</option>
                    <option value="Instructor">Instructor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Documento *</label>
                  <Input
                    value={formData.document}
                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                    placeholder="Número de documento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Programa/Ficha *</label>
                  <Input
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="Nombre del programa o ficha"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notas</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Observaciones adicionales"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSaveRecord}>Guardar Registro</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          )}

          {/* Records Table */}
          <Card className="bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Programa</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Último Seguimiento</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map(record => (
                      <tr key={record.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{record.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                            {record.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{record.program}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(record.lastUpdate).toLocaleDateString('es-CO')}
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button
                            onClick={() => setSelectedRecord(record)}
                            className="p-1.5 hover:bg-blue-100 rounded-md transition text-blue-600 inline-block"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(record)}
                            className="p-1.5 hover:bg-amber-100 rounded-md transition text-amber-600 inline-block"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600 inline-block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                        No hay registros de seguimiento
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Details Panel */}
        {selectedRecord && (
          <div className="lg:col-span-1">
            <Card className="bg-white sticky top-4">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Detalles</h3>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Nombre</p>
                    <p className="text-slate-900 font-semibold">{selectedRecord.name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Tipo</p>
                    <p className="text-slate-900">{selectedRecord.type}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Documento</p>
                    <p className="text-slate-900">{selectedRecord.document}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Programa</p>
                    <p className="text-slate-900">{selectedRecord.program}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Estado</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedRecord.status)}`}>
                      {selectedRecord.status}
                    </span>
                  </div>

                  {selectedRecord.type === 'Aprendiz' && (
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Indicadores</p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Asistencia</span>
                            <span className="font-semibold text-slate-900">{selectedRecord.attendance}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedRecord.attendance}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Desempeño Académico</span>
                            <span className="font-semibold text-slate-900">{selectedRecord.academicPerformance}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${selectedRecord.academicPerformance}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Progreso Práctica</span>
                            <span className="font-semibold text-slate-900">{selectedRecord.practiceProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${selectedRecord.practiceProgress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRecord.notes && (
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Notas</p>
                      <p className="text-sm text-slate-600">{selectedRecord.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <Button
                      onClick={() => handleEdit(selectedRecord)}
                      className="flex-1 flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(selectedRecord.id)}
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 text-red-600"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
