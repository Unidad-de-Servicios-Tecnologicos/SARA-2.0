"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

// ✅ DATOS REALES (imagen original)
const chartData = [
  { status: "APLAZADO", value: 160 },
  { status: "CANCELADO", value: 210 },
  { status: "CERTIFICADO", value: 1800 },
  { status: "CONDICIONADO", value: 420 },
  { status: "EN FORMACIÓN", value: 3500 },
  { status: "INDUCCIÓN", value: 90 },
  { status: "RETIRO VOLUNTARIO", value: 45 },
  { status: "TRASLADO", value: 30 },
]

// ✅ CONFIGURACIÓN SHADCN
const chartConfig = {
  value: {
    label: "Aprendices",
    color: "#2563eb", // azul institucional
  },
}

export default function ApprenticesByStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aprendices por Estado de Formación</CardTitle>
        <CardDescription>
          Estado actual del proceso formativo
        </CardDescription>
      </CardHeader>

      <CardContent className="h-105">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 40, left: 170, bottom: 10 }}
          >
            {/* Líneas como la imagen */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />

            {/* EJE X REAL */}
            <XAxis
              type="number"
              domain={[0, "dataMax"]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            {/* EJE Y CON NOMBRES COMPLETOS */}
            <YAxis
              type="category"
              dataKey="status"
              tickLine={false}
              axisLine={false}
              width={160}
              tick={{ fontSize: 12 }}
            />

            {/* TOOLTIP CORRECTO */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    value.toLocaleString(),
                    "Aprendices",
                  ]}
                />
              }
            />

            {/* BARRAS HORIZONTALES */}
            <Bar
              dataKey="value"
              fill="var(--color-value)"
              barSize={10}              // delgadas
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
