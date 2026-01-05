import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ChartOptionsMenu from "../common/ChartOptionsMenu";
import { showToast } from "@/shared/notifications";

const genderData = [
  { name: "Femenino", value: 53.3, color: "#ec4899", label: "F" },
  { name: "Masculino", value: 46.7, color: "#3b82f6", label: "M" },
];

// Componente para mostrar el porcentaje dentro de cada sección
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${value}%`}
    </text>
  );
};

export default function InstructorsByGender() {
  const handleExport = () => {
    showToast.export("PNG");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Instructores por género
        </h3>
        <ChartOptionsMenu onExport={handleExport} />
      </div>

      <div className="flex items-center justify-center gap-6">
        {/* Gráfico de dona - Rosa izquierda, Azul derecha */}
        <div className="w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px"
                }}
              />
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={0}
                startAngle={90}
                endAngle={-270}
                label={renderCustomLabel}
                labelLine={false}
              >
                {genderData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda al lado derecho */}
        <div className="flex flex-col gap-3">
          {genderData.map((g) => (
            <div key={g.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: g.color }}
              />
              <span 
                className="font-semibold text-sm"
                style={{ color: g.color }}
                translate="no"
              >
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}