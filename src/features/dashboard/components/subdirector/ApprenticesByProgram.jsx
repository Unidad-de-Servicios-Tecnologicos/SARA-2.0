import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import ChartOptionsMenu from "../common/ChartOptionsMenu";
import { showToast } from "@/shared/notifications";

const chartData = [
  { name: "Análisis y Desarrollo", value: 401, color: "#3b82f6" },           // Azul
  { name: "Contabilización de Operaciones", value: 28, color: "#22c55e" },   // Verde
  { name: "Control de Calidad", value: 240, color: "#eab308" },              // Amarillo
  { name: "Elaboración de Panadería", value: 25, color: "#f87171" },         // Rojo claro
  { name: "Emprendimiento", value: 51, color: "#c084fc" },                   // Lila
  { name: "Gestión del Talento", value: 7, color: "#4b5563" },               // Gris oscuro
  { name: "Gestión Empresarial", value: 656, color: "#f97316" },             // Naranja fuerte
  { name: "Gestión de Proyectos", value: 320, color: "#64748b" },            // Gris azulado
  { name: "Gestión de Servicios", value: 374, color: "#78716c" },            // Marrón
  { name: "Gestión Integrada", value: 267, color: "#ef4444" },               // Rojo
  { name: "Gestión Integral del Talento", value: 90, color: "#4ade80" },     // Verde claro
  { name: "Informática", value: 34, color: "#6b7280" },                      // Gris
  { name: "Inspección", value: 129, color: "#fb923c" },                      // Naranja claro
  { name: "Mantenimiento", value: 21, color: "#0ea5e9" },                    // Azul petróleo
  { name: "Producción", value: 19, color: "#84cc16" },                       // Verde oliva
  { name: "Recursos Humanos", value: 129, color: "#fbbf24" },                // Amarillo claro
  { name: "Servicios Generales", value: 41, color: "#60a5fa" },              // Azul claro
  { name: "Transporte y Logística", value: 43, color: "#2dd4bf" },           // Verde agua
];

export default function ApprenticesByProgram() {
  const handleExport = () => {
    showToast.export("PNG");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Aprendices activos por programa
        </h3>
        <ChartOptionsMenu onExport={handleExport} />
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart 
          data={chartData}
          margin={{ top: 25, right: 10, left: 10, bottom: 100 }}
        >
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            tick={{ fill: "#374151", fontSize: 8 }}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: "#6b7280", fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
            domain={[0, 800]}
            ticks={[0, 200, 400, 600, 800]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#fff", 
              border: "1px solid #e5e7eb",
              borderRadius: "6px"
            }}
            formatter={(value) => [value, "Cantidad"]}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={20}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList 
              dataKey="value" 
              position="top" 
              fill="#374151" 
              fontSize={9}
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}