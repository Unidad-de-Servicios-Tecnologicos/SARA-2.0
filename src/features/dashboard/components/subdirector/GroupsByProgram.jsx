import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { groupsByProgram } from "../../mock/dashboard.mock";

export default function GroupsByProgram() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4 text-gray-800">
        Fichas por Programa
      </h3>

      <ResponsiveContainer width="100%" aspect={2} minWidth={0} minHeight={0}>
        <BarChart data={groupsByProgram} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={120} />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}