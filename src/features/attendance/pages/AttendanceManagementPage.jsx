import { useState } from 'react'
import { Calendar, Download, Save, History, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/card'
import { showToast, showAlert } from '@/shared/notifications'
import { downloadReport } from '@/utils/downloadReports'

export default function AttendanceManagementPage() {
  const [selectedFicha, setSelectedFicha] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState({})
  const [showHistory, setShowHistory] = useState(false)

  // Mock data
  const learners = [
    { id: 1, document: '1234567890', name: 'Juan Carlos López' },
    { id: 2, document: '9876543210', name: 'María Rodríguez García' },
    { id: 3, document: '1122334455', name: 'Carlos Pérez Martínez' },
    { id: 4, document: '5566778899', name: 'Ana María López' },
    { id: 5, document: '1234512345', name: 'Luis Fernando García' },
    { id: 6, document: '9999888877', name: 'Sofia Martínez Ruiz' },
    { id: 7, document: '4545454545', name: 'Pedro Sánchez Torres' },
    { id: 8, document: '7878787878', name: 'Jessica Rodríguez López' },
    { id: 9, document: '1111222233', name: 'Diego Herrera Gómez' },
    { id: 10, document: '3333444455', name: 'Catalina Valencia Cruz' },
    { id: 11, document: '6666777788', name: 'Roberto Díaz Ortiz' },
    { id: 12, document: '9999000011', name: 'Natalia Prieto Vélez' }
  ]

  const fichas = [
    { id: '2818588', program: 'Administración Empresarial' },
    { id: '2818589', program: 'Gestión Logística' },
    { id: '2818590', program: 'Contabilización de Operaciones' }
  ]

  // Inicializar asistencia
  const initializeAttendance = () => {
    const newAttendance = {}
    learners.forEach(learner => {
      newAttendance[learner.id] = true // true = presente, false = ausente
    })
    setAttendance(newAttendance)
  }

  const handleConsult = () => {
    if (!selectedFicha) {
      showAlert.warning('Validación', 'Por favor selecciona una ficha')
      return
    }
    initializeAttendance()
    showToast.info(`Ficha ${selectedFicha} cargada para el ${selectedDate}`)
  }

  const handleExportData = async (format) => {
    if (!selectedFicha) {
      showAlert.warning('Por favor selecciona una ficha para exportar')
      return
    }

    const toastId = showToast.loading(`Preparando ${format.toUpperCase()}...`)
    
    try {
      const dataToExport = learners.map(learner => ({
        documento: learner.document || '',
        aprendiz: learner.name || '',
        fecha: selectedDate || '',
        asistencia: attendance[learner.id] ? 'Presente' : 'Ausente',
        observacion: ''
      }))

      const columns = [
        { key: 'documento', label: 'Documento' },
        { key: 'aprendiz', label: 'Aprendiz' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'asistencia', label: 'Asistencia' },
        { key: 'observacion', label: 'Observación' }
      ]

      await downloadReport(
        dataToExport,
        columns,
        'Gestión de Asistencia',
        `asistencia_${selectedFicha}_${selectedDate}`,
        format,
        {
          subtitulo: `Reporte de asistencia para la ficha ${selectedFicha} del ${selectedDate}`,
          rowClassName: (row) => {
            if (row.asistencia === 'Presente') return 'bg-green-50'
            if (row.asistencia === 'Ausente') return 'bg-red-50'
            return 'bg-white'
          }
        }
      )

      showToast.dismiss(toastId)
      showToast.success(`${dataToExport.length} registros exportados exitosamente`)
    } catch (error) {
      showToast.dismiss(toastId)
      showToast.error('Error al exportar los datos')
      console.error('Export error:', error)
    }
  }

  const handleViewHistory = () => {
    if (!selectedFicha) {
      showAlert.warning('Validación', 'Por favor selecciona una ficha para ver el historial')
      return
    }
    setShowHistory(!showHistory)
    showToast.info(`Historial de asistencia para ficha ${selectedFicha}`)
  }

  const toggleAttendance = (learnerId) => {
    setAttendance(prev => ({
      ...prev,
      [learnerId]: !prev[learnerId]
    }))
  }

  const handleSaveAttendance = () => {
    if (!selectedFicha) {
      showAlert.warning('Validación', 'Por favor selecciona una ficha')
      return
    }
    const toastId = showToast.loading('Guardando asistencia...')
    try {
      console.log('Guardando asistencia:', { date: selectedDate, ficha: selectedFicha, attendance })
      // Lógica para guardar en API
      setTimeout(() => {
        showToast.dismiss(toastId)
        showToast.success('Asistencia guardada correctamente')
      }, 1000)
    } catch (error) {
      showToast.dismiss(toastId)
      showToast.error('Error al guardar la asistencia')
    }
  }

  const presentCount = Object.values(attendance).filter(v => v).length
  const absentCount = Object.values(attendance).filter(v => !v).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestión de Asistencia</h1>
        <p className="text-slate-600">Registro y seguimiento de asistencia de aprendices</p>
      </div>

        {/* Área de Consulta */}
        <Card className="mb-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Consultar Asistencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Número de Ficha</label>
              <select
                value={selectedFicha}
                onChange={(e) => setSelectedFicha(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione una ficha</option>
                {fichas.map(ficha => (
                  <option key={ficha.id} value={ficha.id}>
                    {ficha.id} - {ficha.program}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleConsult} className="w-full">
                Consultar
              </Button>
            </div>
          </div>
        </Card>

        {/* Acciones */}
        {Object.keys(attendance).length > 0 && (
          <Card className="mb-6 p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-slate-600">Presentes</p>
                  <p className="text-3xl font-bold text-green-600">{presentCount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Ausentes</p>
                  <p className="text-3xl font-bold text-red-600">{absentCount}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={handleViewHistory}
                  className="flex items-center gap-2 flex-1 md:flex-none"
                >
                  <History className="w-4 h-4" />
                  Historial
                </Button>
                <div className="flex gap-1 flex-1 md:flex-none">
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
                <Button
                  onClick={handleSaveAttendance}
                  className="flex items-center gap-2 flex-1 md:flex-none"
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Tabla de Asistencia */}
        {Object.keys(attendance).length > 0 && (
          <Card className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Documento</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Aprendiz</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Asistencia</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Justificación</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((learner, index) => (
                    <tr key={learner.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{learner.document}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{learner.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleAttendance(learner.id)}
                          className={`px-3 py-2 rounded-lg font-medium transition cursor-pointer text-white ${
                            attendance[learner.id] ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                          }`}
                        >
                          {attendance[learner.id] ? 'Presente' : 'Ausente'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {!attendance[learner.id] && (
                          <Input
                            placeholder="Motivo..."
                            className="text-sm"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Mensaje cuando no hay datos */}
        {Object.keys(attendance).length === 0 && (
          <Card className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Selecciona una ficha y fecha para registrar asistencia</p>
          </Card>
        )}
    </div>
  )
}
