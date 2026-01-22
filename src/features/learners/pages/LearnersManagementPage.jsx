import { useState, useMemo } from 'react'
import { Plus, Search, Download, Filter, AlertTriangle, TrendingUp, Users, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/card'
import LearnerDetailModal from '../components/LearnerDetailModal'
import LearnerFormModal from '../components/LearnerFormModal'
import LearnerTable from '../components/LearnerTable'
import { showToast } from '@/shared/notifications'
import Swal from 'sweetalert2'
import { mockFichas } from '@/features/records/mock/records.mock'

export default function LearnersManagementPage() {
  // Filtros de búsqueda
  const [searchDocument, setSearchDocument] = useState('')
  const [searchFicha, setSearchFicha] = useState('')
  const [searchPrograma, setSearchPrograma] = useState('')
  const [searchEstado, setSearchEstado] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  const [selectedLearner, setSelectedLearner] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingLearner, setEditingLearner] = useState(null)

  // Mock data - en producción vendría del API
  const [learners, setLearners] = useState([
    {
      id: 1,
      document: '1234567890',
      name: 'Juan Carlos López',
      email: 'juan@example.com',
      phone: '3015551234',
      fichaId: '2889927',
      program: 'Análisis y Desarrollo de Software',
      state: 'EN FORMACIÓN',
      academicPerformance: 'Bueno',
      attendance: '95%',
      totalJuicios: 24,
      juiciosAprobados: 17,
      juiciosNoAprobados: 2,
      juiciosPorEvaluar: 5,
      hasAcademicHistory: false,
      isInProactive: false,
      fichaState: 'activa',
      // Datos de RAPs
      raps: [
        { id: 1, codigo: 'RA1', nombre: 'Interpretar la arquitectura del software', competencia: 'Analizar los requerimientos', estado: 'aprobado', trimestre: 1 },
        { id: 2, codigo: 'RA2', nombre: 'Diseñar la solución de software', competencia: 'Analizar los requerimientos', estado: 'aprobado', trimestre: 2 },
        { id: 3, codigo: 'RA3', nombre: 'Desarrollar el sistema de información', competencia: 'Construir el sistema de información', estado: 'en_progreso', trimestre: 3 },
        { id: 4, codigo: 'RA4', nombre: 'Aplicar buenas prácticas de calidad', competencia: 'Construir el sistema de información', estado: 'no_aprobado', trimestre: 4 },
        { id: 5, codigo: 'RA5', nombre: 'Implementar la solución de software', competencia: 'Implantar la solución', estado: 'pendiente', trimestre: 5 },
      ],
      // Relaciones con otros módulos
      fichas: [
        { id: '2889927', name: 'Análisis y Desarrollo de Software', startDate: '2024-02-15', endDate: '2026-02-15', estado: 'Activa', jornada: 'Diurna', trimestre: 4 }
      ],
      practices: [],
      attendance_records: [
        { date: '2024-01-20', status: 'Presente', hour: '08:00' },
        { date: '2024-01-19', status: 'Presente', hour: '08:00' },
        { date: '2024-01-18', status: 'Ausente', hour: '08:00' },
        { date: '2024-01-17', status: 'Presente', hour: '08:00' }
      ],
      comites: [],
      state_history: [
        { date: '2024-02-15', previousState: 'Inscrito', newState: 'EN FORMACIÓN', reason: 'Inicio de formación' }
      ]
    },
    {
      id: 2,
      document: '9876543210',
      name: 'María Rodríguez García',
      email: 'maria@example.com',
      phone: '3015555678',
      fichaId: '2889927',
      program: 'Análisis y Desarrollo de Software',
      state: 'EN FORMACIÓN',
      academicPerformance: 'Excelente',
      attendance: '100%',
      totalJuicios: 24,
      juiciosAprobados: 21,
      juiciosNoAprobados: 0,
      juiciosPorEvaluar: 3,
      hasAcademicHistory: true,
      isInProactive: false,
      fichaState: 'activa',
      raps: [
        { id: 1, codigo: 'RA1', nombre: 'Interpretar la arquitectura del software', competencia: 'Analizar los requerimientos', estado: 'aprobado', trimestre: 1 },
        { id: 2, codigo: 'RA2', nombre: 'Diseñar la solución de software', competencia: 'Analizar los requerimientos', estado: 'aprobado', trimestre: 2 },
        { id: 3, codigo: 'RA3', nombre: 'Desarrollar el sistema de información', competencia: 'Construir el sistema de información', estado: 'aprobado', trimestre: 3 },
        { id: 4, codigo: 'RA4', nombre: 'Aplicar buenas prácticas de calidad', competencia: 'Construir el sistema de información', estado: 'en_progreso', trimestre: 4 },
      ],
      fichas: [
        { id: '2889927', name: 'Análisis y Desarrollo de Software', startDate: '2024-02-15', endDate: '2026-02-15', estado: 'Activa', jornada: 'Diurna', trimestre: 4 }
      ],
      practices: [],
      attendance_records: [
        { date: '2024-01-20', status: 'Presente', hour: '08:00' },
        { date: '2024-01-19', status: 'Presente', hour: '08:00' },
        { date: '2024-01-18', status: 'Presente', hour: '08:00' }
      ],
      comites: [],
      state_history: [
        { date: '2024-02-15', previousState: 'Inscrito', newState: 'EN FORMACIÓN', reason: 'Inicio de formación' }
      ]
    },
    {
      id: 3,
      document: '1122334455',
      name: 'Carlos Pérez Martínez',
      email: 'carlos@example.com',
      phone: '3015559999',
      fichaId: '2889929',
      program: 'Gestión Administrativa',
      state: 'CERTIFICADO',
      academicPerformance: 'Bueno',
      attendance: '92%',
      totalJuicios: 30,
      juiciosAprobados: 30,
      juiciosNoAprobados: 0,
      juiciosPorEvaluar: 0,
      hasAcademicHistory: true,
      isInProactive: true,
      fichaState: 'finalizada',
      raps: [],
      fichas: [
        { id: '2889929', name: 'Gestión Administrativa', startDate: '2023-08-15', endDate: '2025-08-15', estado: 'En Etapa Productiva', jornada: 'Mixta', trimestre: 7 }
      ],
      practices: [
        { id: 3, company: 'Bancolombia S.A.', startDate: '2025-03-15', endDate: '2025-09-15', estado: 'En Proceso', supervisor: 'Claudia Campuzano', tipo: 'Contrato de Aprendizaje' }
      ],
      attendance_records: [
        { date: '2024-01-15', status: 'Presente', hour: '18:00' },
        { date: '2024-01-14', status: 'Presente', hour: '18:00' }
      ],
      comites: [
        { fecha: '2024-06-15', tipo: 'Académico', motivo: 'Bajo rendimiento en trimestre 3', decision: 'Condicionamiento', observaciones: 'Se requiere plan de mejora' }
      ],
      state_history: [
        { date: '2025-03-15', previousState: 'EN FORMACIÓN', newState: 'EN PRÁCTICA', reason: 'Inicio de etapa productiva' },
        { date: '2024-06-15', previousState: 'EN FORMACIÓN', newState: 'CONDICIONADO', reason: 'Comité académico' },
        { date: '2024-07-15', previousState: 'CONDICIONADO', newState: 'EN FORMACIÓN', reason: 'Cumplimiento plan de mejora' }
      ]
    },
    {
      id: 4,
      document: '5566778899',
      name: 'Ana Sofía Mendoza',
      email: 'ana@example.com',
      phone: '3015554321',
      fichaId: '2889928',
      program: 'Producción Multimedia',
      state: 'CONDICIONADO',
      academicPerformance: 'Regular',
      attendance: '75%',
      totalJuicios: 20,
      juiciosAprobados: 12,
      juiciosNoAprobados: 5,
      juiciosPorEvaluar: 3,
      hasAcademicHistory: true,
      isInProactive: false,
      fichaState: 'activa',
      raps: [
        { id: 1, codigo: 'RA1', nombre: 'Diseñar productos multimedia', competencia: 'Producción multimedia', estado: 'aprobado', trimestre: 1 },
        { id: 2, codigo: 'RA2', nombre: 'Desarrollar contenido audiovisual', competencia: 'Producción multimedia', estado: 'no_aprobado', trimestre: 2 },
        { id: 3, codigo: 'RA3', nombre: 'Editar productos multimedia', competencia: 'Producción multimedia', estado: 'no_aprobado', trimestre: 3 },
      ],
      fichas: [
        { id: '2889928', name: 'Producción Multimedia', startDate: '2024-03-01', endDate: '2026-03-01', estado: 'Activa', jornada: 'Nocturna', trimestre: 3 }
      ],
      practices: [],
      attendance_records: [
        { date: '2024-01-20', status: 'Ausente', hour: '18:00' },
        { date: '2024-01-19', status: 'Presente', hour: '18:00' },
        { date: '2024-01-18', status: 'Ausente', hour: '18:00' }
      ],
      comites: [
        { fecha: '2024-12-10', tipo: 'Académico', motivo: 'RAPs no aprobados', decision: 'Condicionamiento', observaciones: 'Debe aprobar RAPs pendientes en 30 días' }
      ],
      state_history: [
        { date: '2024-12-10', previousState: 'EN FORMACIÓN', newState: 'CONDICIONADO', reason: 'Comité académico - RAPs no aprobados' }
      ]
    }
  ])

  // Opciones para filtros
  const fichaOptions = useMemo(() => {
    const uniqueFichas = [...new Set(learners.map(l => l.fichaId))]
    return uniqueFichas.map(fichaId => {
      const ficha = mockFichas.find(f => f.numero === fichaId)
      return {
        value: fichaId,
        label: ficha ? `${fichaId} - ${ficha.programa?.nombre}` : fichaId
      }
    })
  }, [learners])

  const programaOptions = useMemo(() => {
    const uniquePrograms = [...new Set(learners.map(l => l.program))]
    return uniquePrograms.map(program => ({
      value: program,
      label: program
    }))
  }, [learners])

  const estadoOptions = [
    { value: 'EN FORMACIÓN', label: 'En Formación' },
    { value: 'CERTIFICADO', label: 'Certificado' },
    { value: 'CONDICIONADO', label: 'Condicionado' },
    { value: 'RETIRADO', label: 'Retirado' },
    { value: 'APLAZADO', label: 'Aplazado' },
  ]

  // Filtrar aprendices
  const filteredLearners = useMemo(() => {
    return learners.filter(learner => {
      const matchDocument = !searchDocument || learner.document.includes(searchDocument)
      const matchFicha = !searchFicha || learner.fichaId === searchFicha
      const matchPrograma = !searchPrograma || learner.program === searchPrograma
      const matchEstado = !searchEstado || learner.state === searchEstado
      return matchDocument && matchFicha && matchPrograma && matchEstado
    })
  }, [learners, searchDocument, searchFicha, searchPrograma, searchEstado])

  // Calcular KPIs
  const kpis = useMemo(() => {
    const total = learners.length
    const enFormacion = learners.filter(l => l.state === 'EN FORMACIÓN').length
    const certificados = learners.filter(l => l.state === 'CERTIFICADO').length
    const condicionados = learners.filter(l => l.state === 'CONDICIONADO').length
    const conAlertas = learners.filter(l => 
      l.juiciosNoAprobados > 0 || 
      parseInt(l.attendance) < 80 ||
      l.state === 'CONDICIONADO'
    ).length
    const totalJuicios = learners.reduce((sum, l) => sum + (l.totalJuicios || 0), 0)
    const juiciosAprobados = learners.reduce((sum, l) => sum + (l.juiciosAprobados || 0), 0)
    const juiciosNoAprobados = learners.reduce((sum, l) => sum + (l.juiciosNoAprobados || 0), 0)
    const juiciosPorEvaluar = learners.reduce((sum, l) => sum + (l.juiciosPorEvaluar || 0), 0)

    return {
      total,
      enFormacion,
      certificados,
      condicionados,
      conAlertas,
      totalJuicios,
      juiciosAprobados,
      juiciosNoAprobados,
      juiciosPorEvaluar
    }
  }, [learners])

  // Validar si un aprendiz puede ser eliminado
  const canDeleteLearner = (learner) => {
    return !learner.hasAcademicHistory && 
           !learner.isInProactive && 
           (learner.fichaState === 'activa' || learner.fichaState === 'inicial')
  }

  const handleDownloadReport = () => {
    const csv = generateCSV(filteredLearners)
    downloadFile(csv, 'aprendices.csv')
    showToast.success('Reporte descargado correctamente')
  }

  const handleNewLearner = () => {
    setEditingLearner(null)
    setShowFormModal(true)
  }

  const handleViewLearner = (learner) => {
    setSelectedLearner(learner)
    setShowDetailModal(true)
  }

  const handleEditLearner = (learner) => {
    setEditingLearner(learner)
    setShowFormModal(true)
  }

  const handleSaveLearner = (formData) => {
    if (editingLearner) {
      // Actualizar aprendiz existente
      setLearners(learners.map(l =>
        l.id === editingLearner.id
          ? { ...l, ...formData }
          : l
      ))
      showToast.success('Aprendiz actualizado correctamente')
    } else {
      // Crear nuevo aprendiz
      const newLearner = {
        id: Math.max(...learners.map(l => l.id), 0) + 1,
        ...formData,
        academicPerformance: 'Regular',
        attendance: '0%',
        totalJuicios: 0,
        juiciosAprobados: 0,
        juiciosNoAprobados: 0,
        juiciosPorEvaluar: 0,
        hasAcademicHistory: false,
        isInProactive: false,
        fichaState: 'activa',
        raps: [],
        fichas: [],
        practices: [],
        attendance_records: [],
        comites: [],
        state_history: [
          { date: new Date().toISOString().split('T')[0], previousState: 'Nuevo', newState: formData.state || 'EN FORMACIÓN', reason: 'Registro inicial' }
        ]
      }
      setLearners([...learners, newLearner])
      showToast.success('Aprendiz creado correctamente')
    }
    setShowFormModal(false)
    setEditingLearner(null)
  }

  const handleDeleteLearner = async (learner) => {
    if (canDeleteLearner(learner)) {
      const result = await Swal.fire({
        icon: 'warning',
        title: '¿Eliminar aprendiz?',
        html: `<p>¿Estás seguro de que deseas eliminar a <strong>${learner.name}</strong>?</p>
               <p class="text-sm text-gray-600 mt-2">Esta acción no se puede deshacer.</p>`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        confirmButtonColor: '#ef4444',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        try {
          setLearners(learners.filter(l => l.id !== learner.id))
          showToast.success('Aprendiz eliminado correctamente')
        } catch (error) {
          showToast.error('Error al eliminar el aprendiz')
          console.error(error)
        }
      }
    } else {
      const reasons = []
      if (learner.hasAcademicHistory) reasons.push('Tiene historial académico registrado')
      if (learner.isInProactive) reasons.push('Está asociado a procesos formales/prácticas')
      if (learner.fichaState === 'finalizada') reasons.push('La ficha está finalizada')
      if (learner.fichaState === 'cerrada') reasons.push('La ficha está cerrada')

      const result = await Swal.fire({
        icon: 'info',
        title: 'No se puede eliminar este aprendiz',
        html: `<div class="text-left">
                 <p class="mb-3">El aprendiz <strong>${learner.name}</strong> no puede ser eliminado por:</p>
                 <ul class="list-disc list-inside text-sm text-gray-700 mb-4">
                   ${reasons.map(r => `<li>${r}</li>`).join('')}
                 </ul>
                 <p class="text-sm text-gray-600">Según SARA, en lugar de eliminar, se debe cambiar el estado del aprendiz.</p>
               </div>`,
        showCancelButton: true,
        confirmButtonText: 'Cambiar Estado',
        confirmButtonColor: '#3b82f6',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        handleChangeState(learner)
      }
    }
  }

  const handleChangeState = async (learner) => {
    const result = await Swal.fire({
      title: 'Cambiar Estado del Aprendiz',
      html: `<div class="text-left">
               <p class="mb-4 text-sm text-gray-700">Aprendiz: <strong>${learner.name}</strong></p>
               <label class="block text-sm font-medium text-gray-700 mb-2">Selecciona nuevo estado:</label>
               <select id="newState" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                 <option value="">-- Seleccionar estado --</option>
                 <option value="Retirado">Retirado</option>
                 <option value="Cancelado">Cancelado</option>
                 <option value="Trasladado">Trasladado</option>
                 <option value="Desertor">Desertor</option>
                 <option value="Inactivo">Inactivo</option>
               </select>
             </div>`,
      didOpen: () => {
        document.getElementById('newState').focus()
      },
      preConfirm: () => {
        const newState = document.getElementById('newState').value
        if (!newState) {
          Swal.showValidationMessage('Por favor selecciona un estado')
          return false
        }
        return { newState }
      },
      confirmButtonText: 'Cambiar Estado',
      confirmButtonColor: '#3b82f6',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        setLearners(learners.map(l => 
          l.id === learner.id 
            ? { ...l, state: result.value.newState }
            : l
        ))
        showToast.success(`Estado cambiado a ${result.value.newState}`)
      } catch (error) {
        showToast.error('Error al cambiar el estado')
        console.error(error)
      }
    }
  }

  const clearFilters = () => {
    setSearchDocument('')
    setSearchFicha('')
    setSearchPrograma('')
    setSearchEstado('')
  }

  const generateCSV = (data) => {
    const headers = ['Documento', 'Nombre', 'Email', 'Teléfono', 'Ficha', 'Programa', 'Estado', 'Total Juicios', 'Aprobados', 'No Aprobados', 'Por Evaluar', 'Asistencia']
    const rows = data.map(d => [
      d.document,
      d.name,
      d.email,
      d.phone,
      d.fichaId,
      d.program,
      d.state,
      d.totalJuicios,
      d.juiciosAprobados,
      d.juiciosNoAprobados,
      d.juiciosPorEvaluar,
      d.attendance
    ])

    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  const downloadFile = (content, filename) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestión de Aprendices</h1>
        <p className="text-slate-600">Consulta, seguimiento y análisis del ciclo formativo de los aprendices</p>
      </div>

      {/* Panel de Búsqueda */}
      <Card className="mb-6 p-6">
        <div className="flex flex-col gap-4">
          {/* Búsqueda principal por documento */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Buscar por documento (principal)..."
                  value={searchDocument}
                  onChange={(e) => setSearchDocument(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 ${showFilters ? 'bg-blue-50 border-blue-300' : ''}`}
              >
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadReport}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button
                size="sm"
                onClick={handleNewLearner}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nuevo Aprendiz
              </Button>
            </div>
          </div>

          {/* Filtros avanzados */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ficha</label>
                <select
                  value={searchFicha}
                  onChange={(e) => setSearchFicha(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Todas las fichas</option>
                  {fichaOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Programa</label>
                <select
                  value={searchPrograma}
                  onChange={(e) => setSearchPrograma(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Todos los programas</option>
                  {programaOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={searchEstado}
                  onChange={(e) => setSearchEstado(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Todos los estados</option>
                  {estadoOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* KPIs del Módulo */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Total Aprendices</p>
              <p className="text-2xl font-bold text-slate-900">{kpis.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">En Formación</p>
              <p className="text-2xl font-bold text-blue-600">{kpis.enFormacion}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Certificados</p>
              <p className="text-2xl font-bold text-green-600">{kpis.certificados}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Condicionados</p>
              <p className="text-2xl font-bold text-yellow-600">{kpis.condicionados}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-slate-600">Con Alertas</p>
              <p className="text-2xl font-bold text-red-600">{kpis.conAlertas}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Resumen de Juicios */}
      <Card className="mb-6 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Resumen de Juicios Evaluativos</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{kpis.totalJuicios}</p>
            <p className="text-xs text-gray-600">Total Juicios</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{kpis.juiciosAprobados}</p>
            <p className="text-xs text-gray-600">Aprobados</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{kpis.juiciosNoAprobados}</p>
            <p className="text-xs text-gray-600">No Aprobados</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{kpis.juiciosPorEvaluar}</p>
            <p className="text-xs text-gray-600">Por Evaluar</p>
          </div>
        </div>
      </Card>

      {/* Tabla de Aprendices */}
      <LearnerTable
        learners={filteredLearners}
        loading={false}
        onView={handleViewLearner}
        onEdit={handleEditLearner}
        onDelete={handleDeleteLearner}
      />

      {/* Modal de detalle */}
      <LearnerDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        learner={selectedLearner}
        onEdit={() => handleEditLearner(selectedLearner)}
      />

      {/* Modal de formulario */}
      <LearnerFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setEditingLearner(null)
        }}
        learner={editingLearner}
        onSave={handleSaveLearner}
      />
    </div>
  )
}
