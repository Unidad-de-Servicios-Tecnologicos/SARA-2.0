import KPIBox from "../common/KPIBox"

export default function InstructorKPIs() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <KPIBox label="Fichas Asignadas" value={5} />
      <KPIBox label="Aprendices" value={160} />
      <KPIBox label="Actividades Pendientes" value={12} />
    </div>
  )
}
