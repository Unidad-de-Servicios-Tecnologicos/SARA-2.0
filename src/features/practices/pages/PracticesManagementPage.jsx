import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, Eye, Download, AlertCircle, CheckCircle2, Clock, FileText, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/Input'
import { showToast, showAlert } from '@/shared/notifications'
import { downloadExcel } from '@/utils/downloadExcel'

export default function PracticesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPhase, setFilterPhase] = useState('all')
  const [selectedPractice, setSelectedPractice] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [practices, setPractices] = useState([
    {
      id: 1,
      learnerName: 'Juan Carlos Rodríguez',
      learnerDocument: '1098765432',
      fichaCode: 'FIC-2024-001',
      program: 'Administración de Empresas',
      company: 'GRUPO EMPRESARIAL NACIONAL S.A.',
      nit: '860000000-1',
      sector: 'Servicios Financieros',
      startDate: '2024-12-01',
      endDate: '2025-03-31',
      tutor: 'Diana Martínez',
      instructor: 'Miguel Ángel Castaño',
      phase: 'INDUCCIÓN',
      status: 'En Progreso',
      induction: { completed: true, date: '2024-12-01', notes: 'Inducción completada exitosamente' },
      monitoring: { visits: 4, lastVisit: '2025-01-20', status: 'Activo' },
      documents: { submitted: 5, pending: 2 }
    },
    {
      id: 2,
      learnerName: 'María Elena García López',
      learnerDocument: '1087654321',
      fichaCode: 'FIC-2024-002',
      program: 'Desarrollo de Software',
      company: 'SOLUCIONES TECNOLÓGICAS INNOVARE',
      nit: '800200314-2',
      sector: 'Tecnología',
      startDate: '2024-11-15',
      endDate: '2025-02-15',
      tutor: 'Carlos Rodríguez',
      instructor: 'Laura García López',
      phase: 'SEGUIMIENTO',
      status: 'En Progreso',
      induction: { completed: true, date: '2024-11-15', notes: 'Realizada exitosamente' },
      monitoring: { visits: 6, lastVisit: '2025-01-25', status: 'Activo' },
      documents: { submitted: 7, pending: 0 }
    },
    {
      id: 3,
      learnerName: 'Roberto Sánchez Moreno',
      learnerDocument: '1076543210',
      fichaCode: 'FIC-2024-003',
      program: 'Manufactura',
      company: 'INDUSTRIAS MANUFACTURERAS BOGOTÁ',
      nit: '890820000-3',
      sector: 'Manufactura',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      tutor: 'Patricia González',
      instructor: 'Roberto Sánchez',
      phase: 'FINALIZADO',
      status: 'Completado',
      induction: { completed: true, date: '2024-10-01', notes: 'Exitosa' },
      monitoring: { visits: 12, lastVisit: '2024-12-28', status: 'Completado' },
      documents: { submitted: 8, pending: 0 }
    }
  ])
  const [formData, setFormData] = useState({
    learnerName: '',
    learnerDocument: '',
    fichaCode: '',
    program: '',
    company: '',
    nit: '',
    sector: '',
    startDate: '',
    endDate: '',
    tutor: '',
    instructor: '',
    phase: 'INDUCCIÓN'
  })
  const [editingId, setEditingId] = useState(null)

  // Filter practices
  const filteredPractices = practices.filter(p => {
    const matchesSearch = p.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.learnerDocument.includes(searchTerm) ||
      p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fichaCode.includes(searchTerm)
    const matchesPhase = filterPhase === 'all' || p.phase === filterPhase
    return matchesSearch && matchesPhase
  })

  // Handle form submission
  const handleSavePractice = () => {
    if (!formData.learnerName || !formData.company || !formData.startDate) {
      showAlert.warning('Campos incompletos', 'Por favor completa todos los campos requeridos')
      return
    }

    if (editingId) {
      setPractices(practices.map(p =>
        p.id === editingId ? { ...p, ...formData } : p
      ))
      showToast.success(`Práctica de ${formData.learnerName} actualizada exitosamente`)
      setEditingId(null)
    } else {
      const newPractice = {
        id: Math.max(...practices.map(p => p.id), 0) + 1,
        ...formData,
        status: 'En Progreso',
        induction: { completed: false, date: '', notes: '' },
        monitoring: { visits: 0, lastVisit: '', status: 'Pendiente' },
        documents: { submitted: 0, pending: 0 }
      }
      setPractices([...practices, newPractice])
      showToast.success(`Práctica de ${formData.learnerName} creada exitosamente`)
    }

    setFormData({
      learnerName: '',
      learnerDocument: '',
      fichaCode: '',
      program: '',
      company: '',
      nit: '',
      sector: '',
      startDate: '',
      endDate: '',
      tutor: '',
      instructor: '',
      phase: 'INDUCCIÓN'
    })
    setShowForm(false)
  }

  // Handle edit
  const handleEdit = (practice) => {
    setFormData(practice)
    setEditingId(practice.id)
    setShowForm(true)
    setSelectedPractice(null)
  }

  // Handle delete
  const handleDelete = (id) => {
    const practiceToDelete = practices.find(p => p.id === id)
    showAlert.confirmDelete(practiceToDelete?.learnerName || 'esta práctica').then((result) => {
      if (result.isConfirmed) {
        setPractices(practices.filter(p => p.id !== id))
        setSelectedPractice(null)
        showToast.success('Práctica eliminada exitosamente')
      }
    })
  }

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredPractices.length === 0) {
      showAlert.warning('No hay datos', 'No hay prácticas para exportar')
      return
    }
    
    const toastId = showToast.loading('Preparando archivo de descarga...')
    try {
      const columns = [
        { key: 'learnerName', label: 'Aprendiz' },
        { key: 'learnerDocument', label: 'Documento' },
        { key: 'fichaCode', label: 'Ficha' },
        { key: 'company', label: 'Empresa' },
        { key: 'program', label: 'Programa' },
        { key: 'phase', label: 'Fase' },
        { key: 'status', label: 'Estado' },
        { key: 'startDate', label: 'Inicio' },
        { key: 'endDate', label: 'Fin' }
      ]

      downloadExcel(
        filteredPractices,
        columns,
        'Reporte de Prácticas Profesionales',
        `practicas_${new Date().toISOString().split('T')[0]}`,
        {
          subtitulo: 'Información detallada de prácticas en empresas',
          rowClassName: (row) => row.status === 'Completado' ? 'bg-green-50' : row.status === 'En Progreso' ? 'bg-blue-50' : 'bg-white'
        }
      )
      
      showToast.dismiss(toastId)
      showToast.success(`Se descargó el archivo con ${filteredPractices.length} prácticas`)
    } catch (error) {
      showToast.dismiss(toastId)
      showToast.error('Error al descargar el archivo')
    }
  }

  // Statistics
  const stats = {
    total: practices.length,
    active: practices.filter(p => p.status === 'En Progreso').length,
    completed: practices.filter(p => p.status === 'Completado').length,
    induction: practices.filter(p => p.phase === 'INDUCCIÓN').length
  }

  const getPhaseColor = (phase) => {
    switch(phase) {
      case 'INDUCCIÓN': return 'bg-blue-100 text-blue-800'
      case 'SEGUIMIENTO': return 'bg-amber-100 text-amber-800'
      case 'FINALIZADO': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'En Progreso': return 'text-amber-600'
      case 'Completado': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Gestión de Prácticas y Pasantías</h1>
        <p className="text-slate-600 dark:text-gray-400">Administra la etapa productiva, inducciones, seguimientos y evaluaciones</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase">Total Prácticas</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase">En Progreso</p>
              <p className="text-2xl font-bold text-amber-900">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase">Completadas</p>
              <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase">En Inducción</p>
              <p className="text-2xl font-bold text-purple-900">{stats.induction}</p>
            </div>
          </div>
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
                  placeholder="Buscar aprendiz, empresa, ficha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'INDUCCIÓN', 'SEGUIMIENTO', 'FINALIZADO'].map(phase => (
                  <Button
                    key={phase}
                    variant={filterPhase === phase ? 'default' : 'outline'}
                    onClick={() => setFilterPhase(phase)}
                    size="sm"
                  >
                    {phase === 'all' ? 'Todas' : phase}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowForm(!showForm)
                    setEditingId(null)
                    setFormData({
                      learnerName: '',
                      learnerDocument: '',
                      fichaCode: '',
                      program: '',
                      company: '',
                      nit: '',
                      sector: '',
                      startDate: '',
                      endDate: '',
                      tutor: '',
                      instructor: '',
                      phase: 'INDUCCIÓN'
                    })
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Práctica
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
              </div>
            </div>
          </Card>

          {/* Form */}
          {showForm && (
            <Card className="mb-6 p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {editingId ? 'Editar Práctica' : 'Registrar Nueva Práctica'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Aprendiz *</label>
                  <Input
                    value={formData.learnerName}
                    onChange={(e) => setFormData({ ...formData, learnerName: e.target.value })}
                    placeholder="Nombre del aprendiz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Documento *</label>
                  <Input
                    value={formData.learnerDocument}
                    onChange={(e) => setFormData({ ...formData, learnerDocument: e.target.value })}
                    placeholder="Número de documento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Código Ficha</label>
                  <Input
                    value={formData.fichaCode}
                    onChange={(e) => setFormData({ ...formData, fichaCode: e.target.value })}
                    placeholder="FIC-2024-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Programa</label>
                  <Input
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="Nombre del programa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Empresa *</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">NIT Empresa</label>
                  <Input
                    value={formData.nit}
                    onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                    placeholder="860000000-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sector</label>
                  <Input
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    placeholder="Sector industrial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fase</label>
                  <select
                    value={formData.phase}
                    onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="INDUCCIÓN">Inducción</option>
                    <option value="SEGUIMIENTO">Seguimiento</option>
                    <option value="FINALIZADO">Finalizado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio *</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin *</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tutor Empresa</label>
                  <Input
                    value={formData.tutor}
                    onChange={(e) => setFormData({ ...formData, tutor: e.target.value })}
                    placeholder="Nombre del tutor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instructor SARA</label>
                  <Input
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="Nombre del instructor"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSavePractice} className="flex items-center gap-2">
                  Guardar Práctica
                </Button>
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

          {/* Practices Table */}
          <Card className="bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Aprendiz</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Empresa</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fase</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Período</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPractices.length > 0 ? (
                    filteredPractices.map(practice => (
                      <tr key={practice.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{practice.learnerName}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{practice.company}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPhaseColor(practice.phase)}`}>
                            {practice.phase}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(practice.startDate).toLocaleDateString('es-CO')} - {new Date(practice.endDate).toLocaleDateString('es-CO')}
                        </td>
                        <td className={`px-6 py-4 text-sm font-semibold ${getStatusColor(practice.status)}`}>
                          {practice.status}
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button
                            onClick={() => setSelectedPractice(practice)}
                            className="p-1.5 hover:bg-blue-100 rounded-md transition text-blue-600 inline-block"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(practice)}
                            className="p-1.5 hover:bg-amber-100 rounded-md transition text-amber-600 inline-block"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(practice.id)}
                            className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600 inline-block"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                        No se encontraron prácticas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Side Panel - Practice Details */}
        {selectedPractice && (
          <div className="lg:col-span-1">
            <Card className="bg-white sticky top-4">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Detalles</h3>
                  <button
                    onClick={() => setSelectedPractice(null)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Aprendiz</p>
                    <p className="text-slate-900 font-semibold">{selectedPractice.learnerName}</p>
                    <p className="text-xs text-slate-600">{selectedPractice.learnerDocument}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Empresa</p>
                    <p className="text-slate-900 font-semibold">{selectedPractice.company}</p>
                    <p className="text-xs text-slate-600">{selectedPractice.sector}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Fase</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPhaseColor(selectedPractice.phase)}`}>
                      {selectedPractice.phase}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Inducción</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-600">Estado:</span>{' '}
                        {selectedPractice.induction.completed ? (
                          <span className="text-green-600 font-semibold">✓ Completada</span>
                        ) : (
                          <span className="text-amber-600 font-semibold">Pendiente</span>
                        )}
                      </p>
                      <p className="text-sm text-slate-600">Fecha: {selectedPractice.induction.date}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Seguimiento</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-600">Visitas:</span>{' '}
                        <span className="font-semibold">{selectedPractice.monitoring.visits}</span>
                      </p>
                      <p className="text-sm text-slate-600">Última: {selectedPractice.monitoring.lastVisit}</p>
                      <p className="text-sm">
                        <span className="text-slate-600">Estado:</span>{' '}
                        <span className="font-semibold text-green-600">{selectedPractice.monitoring.status}</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Documentos</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-600">Enviados:</span>{' '}
                        <span className="font-semibold">{selectedPractice.documents.submitted}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-600">Pendientes:</span>{' '}
                        <span className="font-semibold text-amber-600">{selectedPractice.documents.pending}</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Contactos</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-600">Tutor:</span> {selectedPractice.tutor}
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-600">Instructor:</span> {selectedPractice.instructor}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <Button
                      onClick={() => handleEdit(selectedPractice)}
                      className="flex-1 flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(selectedPractice.id)}
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
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
