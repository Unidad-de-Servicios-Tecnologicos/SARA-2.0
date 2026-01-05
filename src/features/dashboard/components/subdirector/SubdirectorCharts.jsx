import InstructorsByContract from "./InstructorsByContract"
import InstructorsByGender from "./InstructorsByGender"
import ApprenticesByStatus from "./ApprenticesByStatus"
import ApprenticesByProgram from "./ApprenticesByProgram"
import FichasByProgram from "./FichasByProgram"

export default function SubdirectorCharts() {
  return (
    <>
      {/* Primera fila: 3 gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <InstructorsByContract />
        <InstructorsByGender />
        <ApprenticesByStatus />
      </div>
      
      {/* Segunda fila: gráficos adicionales */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ApprenticesByProgram />
        <FichasByProgram />
      </div>
    </>
  )
}
