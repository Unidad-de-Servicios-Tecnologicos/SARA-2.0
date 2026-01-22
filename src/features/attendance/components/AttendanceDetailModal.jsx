import { Eye, Calendar, TrendingUp, History } from 'lucide-react'
import { DetailModal } from '@/components/ui/DetailModal'

export function AttendanceDetailModal({
  open,
  onOpenChange,
  record,
  onEdit,
  onDownload
}) {
  if (!record) return null

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      data={record}
      avatar={{
        initials: record.learnerName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        color: 'from-cyan-500 to-blue-600'
      }}
      badges={[
        { 
          label: record.status === 'Presente' ? 'Presente' : 'Ausente', 
          variant: record.status === 'Presente' ? 'success' : 'destructive' 
        },
        { label: record.fichaId, variant: 'info' }
      ]}
      tabs={[
        {
          id: 'general',
          label: 'General',
          icon: <Eye className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información General</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Aprendiz</p>
                    <p className="font-semibold text-slate-900">{record.learnerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Documento</p>
                    <p className="font-semibold text-slate-900">{record.learnerDocument}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Ficha</p>
                    <p className="font-semibold text-slate-900">{record.fichaId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Programa</p>
                    <p className="font-semibold text-slate-900">{record.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Estado</p>
                    <p className={`font-semibold ${
                      record.status === 'Presente' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {record.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'fecha',
          label: 'Fecha y Hora',
          icon: <Calendar className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Registro de Asistencia</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Fecha</p>
                    <p className="font-semibold text-slate-900">{record.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Día de la Semana</p>
                    <p className="font-semibold text-slate-900">{record.dayOfWeek}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Hora de Entrada</p>
                    <p className="font-semibold text-slate-900">{record.entryTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Hora de Salida</p>
                    <p className="font-semibold text-slate-900">{record.exitTime || '---'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Jornada</p>
                    <p className="font-semibold text-slate-900">{record.shift}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Horas Registradas</p>
                    <p className="font-semibold text-slate-900">{record.hoursRegistered} horas</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'detalles',
          label: 'Detalles',
          icon: <TrendingUp className="w-4 h-4" />,
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Información Adicional</h3>
                <div className="space-y-4">
                  {record.justification && (
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Justificación</p>
                      <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{record.justification}</p>
                    </div>
                  )}
                  {record.observations && (
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Observaciones</p>
                      <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{record.observations}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Registrado por</p>
                      <p className="font-semibold text-slate-900">{record.registeredBy}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Fecha de Registro</p>
                      <p className="font-semibold text-slate-900">{record.registeredAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'historial',
          label: 'Historial',
          icon: <History className="w-4 h-4" />,
          content: (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Cambios de Registro</h3>
              <div className="space-y-3">
                {record.auditLog?.map((log, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-l-2 border-cyan-300 pl-4">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full mt-2 -ml-5"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-2">{log.timestamp}</p>
                      <p className="font-medium text-slate-900">{log.action}</p>
                      <p className="text-sm text-slate-600 mt-1">Por: {log.user}</p>
                    </div>
                  </div>
                )) || <p className="text-slate-600">Sin cambios registrados</p>}
              </div>
            </div>
          )
        }
      ]}
      onEdit={onEdit}
      onDownload={onDownload}
    />
  )
}

export default AttendanceDetailModal
