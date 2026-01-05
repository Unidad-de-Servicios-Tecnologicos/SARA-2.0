import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { instructorsByContract } from "../../mock/dashboard.mock";
import DrillDownModal from "../common/DrillDownModal";
import ChartOptionsMenu from "../common/ChartOptionsMenu";
import { showToast } from "@/shared/notifications";

export default function InstructorsByContract() {
  const [drillDownData, setDrillDownData] = useState(null);

  const colors = {
    "Contratista": "#3b82f6",  // Azul
    "Planta": "#16a34a"         // Verde
  };

  const handleBarClick = (data) => {
    if (data && data.activePayload) {
      const item = data.activePayload[0].payload;
      setDrillDownData({
        category: "Instructores por tipo de contrato",
        itemName: item.name,
        value: item.value,
        color: colors[item.name]
      });
    }
  };

  const handleViewDetails = () => {
    setDrillDownData({
      category: "Instructores por tipo de contrato",
      itemName: "Todos",
      value: instructorsByContract.reduce((sum, item) => sum + item.value, 0),
      color: "#3b82f6"
    });
  };

  const handleExport = () => {
    showToast.export("PNG");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Instructores por tipo de contrato
        </h3>
        <ChartOptionsMenu 
          onViewDetails={handleViewDetails}
          onExport={handleExport}
        />
      </div>

      <ResponsiveContainer width="100%" aspect={2} minWidth={0} minHeight={0}>
        <BarChart data={instructorsByContract} onClick={handleBarClick} style={{ cursor: "pointer" }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#fff", 
              border: "1px solid #e5e7eb",
              borderRadius: "6px"
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {instructorsByContract.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[entry.name]} 
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <DrillDownModal 
        isOpen={!!drillDownData}
        onClose={() => setDrillDownData(null)}
        data={drillDownData}
      />
    </div>
  );
}
