import { useState, useCallback } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, Download, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { CreateFichaModal, EditFichaModal } from '@/features/records'
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
  
  // Cargar catálogos para los formularios
  const catalogos = useCatalogos()

  // Mock data de fichas
  const fichas = [
    {
      id: 1,
      code: '2818588',
      program: 'Administración Empresarial',
      level: 'TECNÓLOGO',
      modality: 'PRESENCIAL',
      startDate: '2025-01-15',
      endDate: '2025-08-30',
      practiceStart: '2025-06-15',
      practiceEnd: '2025-08-30',
      coordinator: 'GESTIÓN ADMINISTRATIVA',
      state: 'EN EJECUCIÓN',
      learnerCount: 25,
      instructor: 'Miguel Ángel Castaño'
    },
    {
      id: 2,
      code: '2818589',
      program: 'Gestión Logística',
      level: 'TECNÓLOGO',
      modality: 'VIRTUAL',
      startDate: '2025-01-20',
      endDate: '2025-09-15',
      practiceStart: '2025-07-01',
      practiceEnd: '2025-09-15',
      coordinator: 'PROGRAMAS ESPECIALES',
      state: 'EN EJECUCIÓN',
      learnerCount: 18,
      instructor: 'Laura García López'
    },
    {
      id: 3,
      code: '2818590',
      program: 'Contabilización de Operaciones',
      level: 'TÉCNICO',
      modality: 'PRESENCIAL',
      startDate: '2024-11-01',
      endDate: '2025-05-30',
      practiceStart: '2025-04-01',
      practiceEnd: '2025-05-30',
      coordinator: 'GESTIÓN ADMINISTRATIVA',
      state: 'TERMINADA POR FECHA',
      learnerCount: 22,
      instructor: 'Carlos Mendoza'
    }
  ]

  const filteredFichas = fichas.filter(ficha => {
    const matchesSearch = ficha.code.includes(searchQuery) || 
                         ficha.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ficha.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ficha.state === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDownloadTemplate = useCallback(() => {
    try {
      // Headers del CSV (sin comillas)
      const headers = [
        'Número de Ficha',
        'Programa',
        'Nivel',
        'Jornada',
        'Modalidad',
        'Fecha Inicio',
        'Fecha Fin',
        'Sede',
        'Aula',
        'Instructor Titular',
        'Cupo Máximo'
      ]

      // Filas de ejemplo
      const rows = [
        ['2818588', 'Administración Empresarial', 'TECNÓLOGO', 'Diurna', 'PRESENCIAL', '2025-01-15', '2025-08-30', 'Medellín', 'A-301', 'Miguel Ángel Castaño', '30'],
        ['2818589', 'Gestión Logística', 'TECNÓLOGO', 'Nocturna', 'VIRTUAL', '2025-01-20', '2025-09-15', 'Bogotá', 'Virtual', 'Laura García López', '25'],
        ['', 'Contabilización de Operaciones', 'TÉCNICO', 'Diurna', 'PRESENCIAL', '', '', '', '', '', '']
      ]

      // Función para escapar valores CSV (solo si contienen punto y coma, comillas o saltos)
      const escapeCSV = (cell) => {
        const str = String(cell || '')
        if (str.includes(';') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }

      // Crear contenido CSV con separador punto y coma (;) para Excel en español
      // El punto y coma es el estándar para CSV en idiomas que usan coma como separador decimal
      const csvLines = [
        headers.join(';'),  // Headers con separador punto y coma
        ...rows.map(row => row.map(escapeCSV).join(';'))  // Datos con escaping donde sea necesario
      ]
      
      const csvContent = csvLines.join('\n')

      // Crear blob con BOM UTF-8 para Excel
      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
      
      // Crear link y descargar
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'plantilla_fichas.csv')
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Limpiar
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 100)
      
      showToast.success('Plantilla descargada exitosamente')
    } catch (error) {
      showToast.error('Error al descargar la plantilla')
      console.error(error)
    }
  }, [])

  const handleCreateSuccess = useCallback(() => {
    showToast.success('Ficha creada exitosamente')
    setShowCreateModal(false)
  }, [])

  const handleEditSuccess = useCallback(() => {
    showToast.success('Ficha actualizada exitosamente')
    setShowEditModal(false)
    setEditingFicha(null)
  }, [])

  const handleEditClick = useCallback((ficha) => {
    setEditingFicha(ficha)
    setShowEditModal(true)
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
    } catch (error) {
      showToast.error('Error al eliminar la ficha')
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
              <Button variant="outline" size="sm" onClick={handleDownloadTemplate} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Plantilla
              </Button>
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

        {/* Detalles de Ficha Modal */}
        <Dialog open={!!selectedFicha} onOpenChange={() => setSelectedFicha(null)} hideCloseButton>
          <DialogContent hideCloseButton>
            <div className="w-full overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Detalles de la Ficha</h2>
                <button onClick={() => setSelectedFicha(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[80vh]">
                <div>
                  <p className="text-sm text-slate-600">Código</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.code}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Programa</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.program}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Nivel</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.level}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Modalidad</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.modality}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Inicio de Formación</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Fin de Formación</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Inicio de Prácticas</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.practiceStart}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Fin de Prácticas</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.practiceEnd}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Coordinación</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.coordinator}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Instructor Titular</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Aprendices</p>
                  <p className="font-semibold text-slate-900">{selectedFicha?.learnerCount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Estado</p>
                  <p className={`font-semibold ${selectedFicha?.state === 'EN EJECUCIÓN' ? 'text-blue-600' : 'text-green-600'}`}>
                    {selectedFicha?.state}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de crear ficha */}
        <CreateFichaModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
          catalogos={catalogos}
        />

        {/* Modal de editar ficha */}
        <EditFichaModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setEditingFicha(null)
          }}
          ficha={editingFicha}
          onSuccess={handleEditSuccess}
          catalogos={catalogos}
        />
    </div>
  )
}
