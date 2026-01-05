"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { program: "Administración", activos: 656, egresados: 120 },
  { program: "Gestión Logística", activos: 401, egresados: 98 },
  { program: "Contabilización", activos: 374, egresados: 87 },
  { program: "Gestión Adm.", activos: 320, egresados: 65 },
  { program: "ADSO", activos: 267, egresados: 54 },
]

const chartConfig = {
  activos: {
    label: "Aprendices Activos",
    color: "#16a34a",
  },
  egresados: {
    label: "Egresados",
    color: "#86efac",
  },
}

export default function ApprenticesByProgram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aprendices Activos por Programa</CardTitle>
        <CardDescription>Distribución por programa de formación</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="program"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="activos" fill="#16a34a" radius={4} />
            <Bar dataKey="egresados" fill="#86efac" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}