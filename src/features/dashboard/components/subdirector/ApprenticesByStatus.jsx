import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartOptionsMenu from "../common/ChartOptionsMenu";
import { showToast } from "@/shared/notifications";

const chartData = [
  { name: "Aplazado", value: 120 },
  { name: "Cancelado", value: 300 },
  { name: "Certificado", value: 2100 },
  { name: "Condicionado", value: 800 },
  { name: "En Formación", value: 3500 },
  { name: "Inducción", value: 90 },
  { name: "Retiro Voluntario", value: 45 },
  { name: "Trasladado", value: 30 },
];

export default function ApprenticesByStatus() {
  const handleExport = () => {
    showToast.export("PNG");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Aprendices por estado de formación
        </h3>
        <ChartOptionsMenu onExport={handleExport} />
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
        >
          <XAxis type="number" stroke="#9ca3af" fontSize={11} />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={100} 
            tick={{ fill: "#374151", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#fff", 
              border: "1px solid #e5e7eb",
              borderRadius: "6px"
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}