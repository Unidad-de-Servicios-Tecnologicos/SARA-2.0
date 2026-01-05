import { dashboardMock } from "../../mock/dashboard.mock.js"

export default function ActivitiesTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Fichas Asignadas</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Ficha</th>
            <th>Programa</th>
            <th>Aprendices</th>
          </tr>
        </thead>
        <tbody>
          {dashboardMock.instructor.activities.map((a) => (
            <tr key={a.ficha} className="border-b">
              <td>{a.ficha}</td>
              <td>{a.programa}</td>
              <td>{a.aprendices}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
