import { BarChart, Bar, XAxis, CartesianGrid } from "recharts"
import { dashboardMock } from "../../mock/dashboard.mock.js"

export default function ProgramCharts() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Aprendices por Programa</h2>

      <BarChart width={600} height={300} data={dashboardMock.coordinator.programs}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <Bar dataKey="value" fill="#16a34a" radius={6} />
      </BarChart>
    </div>
  )
}
