import { useState, useCallback } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, Download, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/card'
import FichaSidePanel from '@/features/academic-management/components/FichaSidePanel'
import CreateAcademicFichaModal from '@/features/academic-management/components/CreateAcademicFichaModal'
import EditAcademicFichaModal from '@/features/academic-management/components/EditAcademicFichaModal'
import FichaLearnersModal from '@/features/academic-management/components/FichaLearnersModal'
import FichaInstructorsModal from '@/features/academic-management/components/FichaInstructorsModal'
import FichaScheduleModal from '@/features/academic-management/components/FichaScheduleModal'
import { useCatalogos } from '@/features/records'
import { showToast, showAlert } from '@/shared/notifications'
import { downloadReport } from '@/utils/downloadReports'

export default function AcademicManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedFicha, setSelectedFicha] = useState(null)
  const [editingFicha, setEditingFicha] = useState(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showLearnersModal, setShowLearnersModal] = useState(false)
  const [showInstructorsModal, setShowInstructorsModal] = useState(false)

  // Cargar catálogos para los formularios
  const catalogos = useCatalogos()

  // Mock data de fichas (estado local para reflejar crear/editar)
  const [fichas, setFichas] = useState([
    {
      id: 1,
      code: '2818588',
      program: 'Administración Empresarial',
      level: 'TECNÓLOGO',
      modality: 'PRESENCIAL',
      shift: 'Diurna',
      startDate: '2025-01-15',
      endDate: '2025-08-30',
      coordinator: 'GESTIÓN ADMINISTRATIVA',
      state: 'EN EJECUCIÓN',
      learnerCount: 25,
      instructor: 'Miguel Ángel Castaño',
      maxCapacity: 30,
      availableSlots: 5,
      currentTrimester: 2,
      progress: 45,
      instructorCount: 3,
    },
    {
      id: 2,
      code: '2818589',
      program: 'Gestión Logística',
      level: 'TECNÓLOGO',
      modality: 'VIRTUAL',
      shift: 'Nocturna',
      startDate: '2025-01-20',
      endDate: '2025-09-15',
      coordinator: 'PROGRAMAS ESPECIALES',
      state: 'EN EJECUCIÓN',
      learnerCount: 18,
      instructor: 'Laura García López',
      maxCapacity: 25,
      availableSlots: 7,
      currentTrimester: 1,
      progress: 30,
      instructorCount: 2,
    },
    {
      id: 3,
      code: '2818590',
      program: 'Contabilización de Operaciones',
      level: 'TÉCNICO',
      modality: 'PRESENCIAL',
      shift: 'Diurna',
      startDate: '2024-11-01',
      endDate: '2025-05-30',
      coordinator: 'GESTIÓN ADMINISTRATIVA',
      state: 'TERMINADA POR FECHA',
      learnerCount: 22,
      instructor: 'Carlos Mendoza',
      maxCapacity: 28,
      availableSlots: 6,
      currentTrimester: 3,
      progress: 100,
      instructorCount: 4,
    },
  ])

  const filteredFichas = fichas.filter(ficha => {
    const matchesSearch = ficha.code.includes(searchQuery) || 
                         ficha.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ficha.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ficha.state === filterStatus
    return matchesSearch && matchesStatus
  })

  

  const handleCreateSave = useCallback((nuevaFicha) => {
    setFichas((prev) => [...prev, nuevaFicha])
    setShowCreateModal(false)
  }, [])

  const handleEditSave = useCallback((fichaActualizada) => {
    setFichas((prev) => prev.map((f) => (f.id === fichaActualizada.id ? fichaActualizada : f)))
    setShowEditModal(false)
    setEditingFicha(null)
  }, [])

  const handleEditClick = useCallback((ficha) => {
    setEditingFicha(ficha)
    setShowEditModal(true)
  }, [])

  const handleViewLearners = useCallback((ficha) => {
    if (!ficha) return
    setSelectedFicha(ficha)
    setShowLearnersModal(true)
  }, [])

  const handleViewInstructors = useCallback((ficha) => {
    if (!ficha) return
    setSelectedFicha(ficha)
    setShowInstructorsModal(true)
  }, [])

  const handleViewSchedule = useCallback((ficha) => {
    if (!ficha) return
    setSelectedFicha(ficha)
    setShowScheduleModal(true)
  }, [])

  const handleDeleteClick = useCallback(async (ficha) => {
    const confirmed = await showAlert.confirm(
      `¿Eliminar la ficha ${ficha.code}?`,
      `Se procederá con eliminación lógica. Se preservará el historial académico.`,
      'Eliminar'
    )
    if (!confirmed) return

    try {
      // Simulación de eliminación
      await new Promise(r => setTimeout(r, 500))
      showToast.success(`Ficha ${ficha.code} eliminada exitosamente`)
    } catch (ERROR) {
      showToast.error('Error al eliminar la ficha')
      console.error('Error al eliminar la ficha', ERROR)
    }
  }, [])

  const handleExportData = async (format) => {
    if (!fichas?.length) {
      showAlert.warning('No hay datos para exportar')
      return
    }

    const toastId = showToast.loading(`Preparando ${format.toUpperCase()}...`)
    
    try {
      const dataToExport = fichas.map(ficha => ({
        codigo: ficha.code || '',
        programa: ficha.program || '',
        nivel: ficha.level || '',
        modalidad: ficha.modality || '',
        fechaInicio: ficha.startDate || '',
        fechaFin: ficha.endDate || '',
        coordinador: ficha.coordinator || '',
        instructor: ficha.instructor || '',
        aprendices: ficha.learnerCount || '',
        estado: ficha.state || ''
      }))

      const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'programa', label: 'Programa' },
        { key: 'nivel', label: 'Nivel' },
        { key: 'modalidad', label: 'Modalidad' },
        { key: 'fechaInicio', label: 'Fecha Inicio' },
        { key: 'fechaFin', label: 'Fecha Fin' },
        { key: 'coordinador', label: 'Coordinador' },
        { key: 'instructor', label: 'Instructor' },
        { key: 'aprendices', label: 'Aprendices' },
        { key: 'estado', label: 'Estado' }
      ]

      await downloadReport(
        dataToExport,
        columns,
        'Gestión Académica - Fichas',
        `fichas_academicas_${new Date().toISOString().split('T')[0]}`,
        format,
        {
          subtitulo: 'Información detallada de fichas y programas académicos',
          rowClassName: (row) => {
            if (row.estado === 'EN EJECUCIÓN') return 'bg-green-50'
            if (row.estado === 'FINALIZADA') return 'bg-blue-50'
            if (row.estado === 'SUSPENDIDA') return 'bg-red-50'
            return 'bg-white'
          }
        }
      )

      showToast.dismiss(toastId)
      showToast.success(`${dataToExport.length} fichas exportadas exitosamente`)
    } catch (error) {
      showToast.dismiss(toastId)
      showToast.error('Error al exportar los datos')
      console.error('Export error:', error)
    }
  }

  const getStateColor = (state) => {
    switch (state) {
      case 'EN EJECUCIÓN':
        return 'bg-blue-100 text-blue-800'
      case 'TERMINADA POR FECHA':
        return 'bg-green-100 text-green-800'
      case 'CANCELADA':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestión Académica</h1>
        <p className="text-slate-600">Administra fichas, programas y planes de formación</p>
      </div>

        {/* Panel de Control */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white">
            <p className="text-sm text-slate-600">Total Fichas</p>
            <p className="text-3xl font-bold text-slate-900">{fichas.length}</p>
          </Card>
          <Card className="p-4 bg-white">
            <p className="text-sm text-slate-600">En Ejecución</p>
            <p className="text-3xl font-bold text-blue-600">{fichas.filter(f => f.state === 'EN EJECUCIÓN').length}</p>
          </Card>
          <Card className="p-4 bg-white">
            <p className="text-sm text-slate-600">Aprendices Totales</p>
            <p className="text-3xl font-bold text-purple-600">{fichas.reduce((sum, f) => sum + f.learnerCount, 0)}</p>
          </Card>
          <Card className="p-4 bg-white">
            <p className="text-sm text-slate-600">Coordinaciones</p>
            <p className="text-3xl font-bold text-orange-600">{new Set(fichas.map(f => f.coordinator)).size}</p>
          </Card>
        </div>

        {/* Filtros y Acciones */}
        <Card className="mb-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 flex gap-2 flex-col md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Buscar por código, programa o instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los Estados</option>
                <option value="EN EJECUCIÓN">En Ejecución</option>
                <option value="TERMINADA POR FECHA">Terminada por Fecha</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData('excel')}
                  className="flex items-center gap-2"
                  title="Descargar en Excel"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Excel</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportData('pdf')}
                  className="flex items-center gap-2"
                  title="Descargar en PDF"
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </Button>
              </div>
              <Button size="sm" onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nueva Ficha
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabla de Fichas */}
        <Card className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Código</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Programa</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nivel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Modalidad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Instructor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Aprendices</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fechas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredFichas.length > 0 ? (
                  filteredFichas.map((ficha) => (
                    <tr key={ficha.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{ficha.code}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{ficha.program}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{ficha.level}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          ficha.modality === 'PRESENCIAL' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {ficha.modality}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{ficha.instructor}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-semibold">{ficha.learnerCount}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {ficha.startDate} a {ficha.endDate}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStateColor(ficha.state)}`}>
                          {ficha.state}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedFicha(ficha)}
                            className="p-1.5 hover:bg-blue-100 rounded-md transition text-blue-600" 
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditClick(ficha)}
                            className="p-1.5 hover:bg-yellow-100 rounded-md transition text-yellow-600" 
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(ficha)}
                            className="p-1.5 hover:bg-red-100 rounded-md transition text-red-600" 
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-slate-500">
                      No se encontraron fichas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Panel lateral Ver ficha */}
        <FichaSidePanel
          isOpen={!!selectedFicha}
          onClose={() => setSelectedFicha(null)}
          ficha={selectedFicha}
          onViewLearners={handleViewLearners}
          onViewInstructors={handleViewInstructors}
          onViewSchedule={handleViewSchedule}
        />

        {/* Modales flotantes conectados a los módulos existentes */}
        <FichaLearnersModal
          isOpen={showLearnersModal}
          onClose={() => setShowLearnersModal(false)}
          ficha={selectedFicha}
        />

        <FichaInstructorsModal
          isOpen={showInstructorsModal}
          onClose={() => setShowInstructorsModal(false)}
          ficha={selectedFicha}
        />

        <FichaScheduleModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          ficha={selectedFicha}
        />

        {/* Modal de crear ficha (XL) */}
        <CreateAcademicFichaModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateSave}
          existingCodigos={fichas.map((f) => f.code)}
          catalogos={catalogos}
        />

        {/* Modal de editar ficha (XL) */}
        <EditAcademicFichaModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setEditingFicha(null)
          }}
          ficha={editingFicha}
          onSave={handleEditSave}
        />
    </div>
  )
}
