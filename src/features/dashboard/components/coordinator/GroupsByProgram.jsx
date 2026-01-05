"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
  { program: "Gestión Empresarial", fichas: 40 },
  { program: "Gestión Integrada", fichas: 32 },
  { program: "Asistencia Adm.", fichas: 24 },
  { program: "Contabilización", fichas: 16 },
]

export default function GroupsByProgram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fichas por Programa</CardTitle>
        <CardDescription>Cantidad de grupos activos</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer>
          <BarChart data={chartData} layout="vertical">
            <YAxis
              dataKey="program"
              type="category"
              tickLine={false}
              axisLine={false}
            />
            <XAxis type="number" hide />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="fichas" fill="#16a34a" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}