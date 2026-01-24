import { useState } from 'react'
import { Search, Download, FileText, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { showToast, showAlert } from '@/shared/notifications'
import Swal from 'sweetalert2'

export default function EnvironmentSchedulesPage() {
  const [selectedSede, setSelectedSede] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState('')
  const [showSchedule, setShowSchedule] = useState(false)
  const [hoursScheduled, setHoursScheduled] = useState(0)
  const [maintenanceCounter, setMaintenanceCounter] = useState(1)
  const [isExportingSchedule, setIsExportingSchedule] = useState(false)
  const [isExportingReport, setIsExportingReport] = useState(false)

  // Mock data
  const sedes = [
    { id: 'CESGE', name: 'CESGE - Centro de Servicios Empresariales' },
    { id: 'VIRTUAL', name: 'VIRTUAL - Formación Remota' },
    { id: 'IUSH', name: 'IUSH - Instituto de Usme' },
    { id: 'TEUSQUILLO', name: 'TEUSQUILLO - Sede Centro' }
  ]

  const environments = {
    'CESGE': [
      { id: '101', name: 'Aula 101', capacity: 30, type: 'Aula' },
      { id: '102', name: 'Aula 102', capacity: 30, type: 'Aula' },
      { id: '401', name: 'Laboratorio 401', capacity: 25, type: 'Laboratorio' },
      { id: '402', name: 'Laboratorio 402', capacity: 25, type: 'Laboratorio' },
      { id: 'A1', name: 'Auditorio A1', capacity: 100, type: 'Auditorio' }
    ],
    'VIRTUAL': [
      { id: 'ZOOM-01', name: 'Sala Zoom 01', capacity: 50, type: 'Virtual' },
      { id: 'ZOOM-02', name: 'Sala Zoom 02', capacity: 50, type: 'Virtual' }
    ],
    'IUSH': [
      { id: '201', name: 'Aula 201', capacity: 35, type: 'Aula' },
      { id: '202', name: 'Aula 202', capacity: 35, type: 'Aula' },
      { id: '301', name: 'Taller 301', capacity: 20, type: 'Taller' }
    ]
  }

  const handleConsult = () => {
    if (selectedSede && selectedEnvironment) {
      setHoursScheduled(Math.floor(Math.random() * 40) + 5)
      setShowSchedule(true)
    }
  }

  const handleDownloadSchedule = async () => {
    if (selectedEnvData) {
      try {
        setIsExportingSchedule(true)
        const { ExportService } = await import('@/features/environment-schedules/services/ExportService')
        
        const scheduleData = [
          { day: 'Lunes', startTime: '08:00', endTime: '12:00', competence: 'Desarrollo', status: 'En uso' },
          { day: 'Martes', startTime: '-', endTime: '-', competence: '-', status: 'Disponible' },
          { day: 'Miércoles', startTime: '08:00', endTime: '12:00', competence: 'Desarrollo', status: 'En uso' },
          { day: 'Jueves', startTime: '-', endTime: '-', competence: '-', status: 'Disponible' },
          { day: 'Viernes', startTime: '08:00', endTime: '12:00', competence: 'Desarrollo', status: 'En uso' },
          { day: 'Sábado', startTime: '-', endTime: '-', competence: '-', status: 'Cerrado' },
          { day: 'Domingo', startTime: '-', endTime: '-', competence: '-', status: 'Cerrado' }
        ]
        
        await ExportService.exportScheduleExcel(
          selectedEnvData.name,
          selectedEnvironment,
          selectedEnvData.capacity,
          selectedEnvData.type,
          hoursScheduled,
          scheduleData
        )
        showToast.success('Horario descargado correctamente en formato Excel')
      } catch (error) {
        showToast.error(error.message || 'Error al descargar el horario')
        console.error('Error:', error)
      } finally {
        setIsExportingSchedule(false)
      }
    }
  }

  const handleGenerateReport = async () => {
    if (selectedEnvData) {
      try {
        setIsExportingReport(true)
        const { ExportService } = await import('@/features/environment-schedules/services/ExportService')
        
        const sedeName = sedes.find(s => s.id === selectedSede)?.name || ''
        
        await ExportService.exportReportPDF(
          selectedEnvData.name,
          selectedEnvironment,
          sedeName,
          selectedEnvData.type,
          selectedEnvData.capacity,
          hoursScheduled
        )
        showToast.success('Informe generado y descargado correctamente en formato PDF')
      } catch (error) {
        showToast.error(error.message || 'Error al generar el informe')
        console.error('Error:', error)
      } finally {
        setIsExportingReport(false)
      }
    }
  }

  const handleRequestMaintenance = async () => {
    if (selectedEnvData) {
      try {
        const { value: formValues } = await Swal.fire({
          title: 'Solicitud de Mantenimiento',
          html: `
            <div class="text-left">
              <p class="text-sm text-gray-700 mb-3"><strong>Ambiente:</strong> ${selectedEnvData.name}</p>
              <p class="text-sm text-gray-700 mb-4"><strong>Sede:</strong> ${sedes.find(s => s.id === selectedSede)?.name}</p>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Mantenimiento:</label>
                <select id="maintenanceType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seleccionar tipo</option>
                  <option value="preventivo">Mantenimiento Preventivo</option>
                  <option value="correctivo">Mantenimiento Correctivo</option>
                  <option value="limpieza">Limpieza General</option>
                  <option value="reparacion">Reparación de Equipos</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad:</label>
                <select id="priority" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seleccionar prioridad</option>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Descripción:</label>
                <textarea id="description" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Describe el problema o necesidad de mantenimiento"></textarea>
              </div>
            </div>
          `,
          didOpen: () => {
            document.getElementById('maintenanceType').focus()
          },
          preConfirm: () => {
            const type = document.getElementById('maintenanceType').value
            const priority = document.getElementById('priority').value
            const description = document.getElementById('description').value

            if (!type || !priority || !description.trim()) {
              Swal.showValidationMessage('Por favor completa todos los campos')
              return false
            }

            return { type, priority, description }
          },
          confirmButtonText: 'Enviar Solicitud',
          confirmButtonColor: '#3b82f6',
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
          allowOutsideClick: () => !Swal.isLoading(),
          allowEscapeKey: () => !Swal.isLoading()
        })

        if (formValues) {
          const maintenanceRequest = {
            id: `MTT-${String(maintenanceCounter).padStart(5, '0')}`,
            environment: selectedEnvironment,
            environmentName: selectedEnvData.name,
            sede: selectedSede,
            type: formValues.type,
            status: 'Pendiente',
            requestDate: new Date().toLocaleString('es-CO'),
            priority: formValues.priority,
            description: formValues.description
          }

          setMaintenanceCounter(maintenanceCounter + 1)

          console.log('Solicitud de mantenimiento:', maintenanceRequest)

          await Swal.fire({
            icon: 'success',
            title: '¡Solicitud Registrada!',
            html: `
              <div class="text-left">
                <p class="mb-3"><strong>ID Solicitud:</strong> ${maintenanceRequest.id}</p>
                <p class="mb-3"><strong>Ambiente:</strong> ${maintenanceRequest.environmentName}</p>
                <p class="mb-3"><strong>Tipo:</strong> ${maintenanceRequest.type}</p>
                <p class="mb-3"><strong>Prioridad:</strong> <span class="px-2 py-1 rounded text-sm font-semibold ${
                  maintenanceRequest.priority === 'baja' ? 'bg-green-100 text-green-800' :
                  maintenanceRequest.priority === 'media' ? 'bg-yellow-100 text-yellow-800' :
                  maintenanceRequest.priority === 'alta' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }">${maintenanceRequest.priority.toUpperCase()}</span></p>
                <p><strong>Estado:</strong> <span class="px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800">${maintenanceRequest.status}</span></p>
              </div>
            `,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3b82f6'
          })

          showToast.success('Solicitud de mantenimiento registrada exitosamente')
        }
      } catch (error) {
        console.error('Error:', error)
        showToast.error('Error al procesar la solicitud')
      }
    }
  }

  const environmentList = selectedSede ? environments[selectedSede] || [] : []
  const selectedEnvData = environmentList.find(e => e.id === selectedEnvironment)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Horarios de Ambientes de Formación</h1>
        <p className="text-slate-600 dark:text-gray-400">Consulta la disponibilidad y programación de espacios</p>
      </div>

      {/* Panel de Búsqueda */}
        <Card className="mb-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Buscar Horario de Ambiente</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sede</label>
              <select
                value={selectedSede}
                onChange={(e) => {
                  setSelectedSede(e.target.value)
                  setSelectedEnvironment('')
                  setShowSchedule(false)
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione una sede</option>
                {sedes.map(sede => (
                  <option key={sede.id} value={sede.id}>
                    {sede.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Número de Ambiente</label>
              <select
                value={selectedEnvironment}
                onChange={(e) => {
                  setSelectedEnvironment(e.target.value)
                  setShowSchedule(false)
                }}
                disabled={!selectedSede}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
              >
                <option value="">Seleccione un ambiente</option>
                {environmentList.map(env => (
                  <option key={env.id} value={env.id}>
                    {env.id} - {env.name} (Cap: {env.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleConsult}
                disabled={!selectedEnvironment}
                className="w-full"
              >
                Consultar
              </Button>
            </div>
          </div>
        </Card>

        {/* Información del Ambiente */}
        {showSchedule && selectedEnvData && (
          <Card className="mb-6 p-6 bg-white border-l-4 border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información del Ambiente</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-slate-600">Ambiente</p>
                    <p className="font-semibold text-slate-900">{selectedEnvData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Capacidad</p>
                    <p className="font-semibold text-slate-900">{selectedEnvData.capacity} personas</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Tipo</p>
                    <p className="font-semibold text-slate-900">{selectedEnvData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Sede</p>
                    <p className="font-semibold text-slate-900">{sedes.find(s => s.id === selectedSede)?.name}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Disponibilidad</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-slate-600 mb-1">Horas Programadas</p>
                  <p className="text-3xl font-bold text-blue-600">{hoursScheduled}h</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">En uso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Fin de semana (no disponible)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendario Simple */}
            <div className="border-t border-slate-200 pt-4">
              <h4 className="font-semibold text-slate-900 mb-4">Horario Semanal (Semana del 1-7 de septiembre 2025)</h4>
              <div className="grid grid-cols-7 gap-2">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-xs font-semibold text-slate-600 mb-2">{day}</p>
                    <div className={`p-2 rounded text-xs h-16 flex items-center justify-center ${
                      idx >= 5 ? 'bg-yellow-100 text-yellow-800' : idx % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {idx >= 5 ? 'Cerrado' : idx % 2 === 0 ? 'En uso 08-12h' : 'Disponible'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Acciones */}
        {showSchedule && (
          <Card className="p-6 bg-white">
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={handleDownloadSchedule}
                disabled={isExportingSchedule}
                variant="outline" 
                className={`flex items-center gap-2 flex-1 md:flex-none ${isExportingSchedule ? 'animate-pulse' : ''}`}
              >
                <Download className="w-4 h-4" />
                {isExportingSchedule ? 'Descargando...' : 'Descargar Horario'}
              </Button>
              <Button 
                onClick={handleGenerateReport}
                disabled={isExportingReport}
                variant="outline" 
                className={`flex items-center gap-2 flex-1 md:flex-none ${isExportingReport ? 'animate-pulse' : ''}`}
              >
                <FileText className="w-4 h-4" />
                {isExportingReport ? 'Generando...' : 'Generar Informe'}
              </Button>
              <Button 
                onClick={handleRequestMaintenance}
                className="flex items-center gap-2 flex-1 md:flex-none"
              >
                <AlertCircle className="w-4 h-4" />
                Solicitar Mantenimiento
              </Button>
            </div>
          </Card>
        )}

        {/* Estado cuando no hay selección */}
        {!showSchedule && (
          <Card className="text-center py-12 bg-white">
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Selecciona una sede y un ambiente para ver su horario</p>
          </Card>
        )}
    </div>
  )
}
