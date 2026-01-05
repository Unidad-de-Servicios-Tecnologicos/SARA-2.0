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
  { programa: "ASISTENCIA ADMINIS...", fichas: 32 },
  { programa: "CONTABILIZACIÓN DE...", fichas: 8 },
  { programa: "CONTROL DE MOVIL...", fichas: 8 },
  { programa: "ELABORACIÓN DE A...", fichas: 4 },
  { programa: "EMPRENDIMIENTO Y F...", fichas: 4 },
  { programa: "GESTIÓN INTEGRAL...", fichas: 8 },
  { programa: "GESTIÓN BANCARIA Y...", fichas: 16 },
  { programa: "GESTIÓN DE LA PROPI...", fichas: 8 },
  { programa: "GESTIÓN DEL TALENT...", fichas: 24 },
  { programa: "GESTIÓN EMPRESAR...", fichas: 37 },
  { programa: "GESTIÓN INTEGRAD...", fichas: 8 },
  { programa: "GESTIÓN INTEGRAL...", fichas: 8 },
  { programa: "INFORMACIÓN Y SER...", fichas: 4 },
  { programa: "INTEGRACIÓN DE O...", fichas: 8 },
  { programa: "MANEJO DE MONTACA...", fichas: 8 },
  { programa: "PROMOCIÓN DE PROD...", fichas: 4 },
  { programa: "RECURSOS HUMANO...", fichas: 8 },
  { programa: "SERVICIOS COMERC...", fichas: 8 },
  { programa: "TRANSPORTE MASI...", fichas: 8 },
];

export default function FichasByProgram() {
  const handleExport = () => {
    showToast.export("PNG");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Fichas por programa
        </h3>
        <ChartOptionsMenu onExport={handleExport} />
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
          barSize={12}
        >
          <XAxis 
            type="number" 
            stroke="#9ca3af" 
            fontSize={10}
            domain={[0, 40]}
            ticks={[0, 8, 16, 24, 32, 40]}
            axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            tickLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
          />
          <YAxis
            dataKey="programa"
            type="category"
            width={140}
            tick={{ fill: "#374151", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
            }}
          />
          <Bar 
            dataKey="fichas" 
            fill="#38bdf8" 
            radius={[0, 4, 4, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}