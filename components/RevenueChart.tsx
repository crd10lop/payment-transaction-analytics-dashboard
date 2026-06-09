"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

export interface RevenueChartProps {
  datos: { fecha: string; ingresos: number }[]
}

export const RevenueChart = ({ datos }: RevenueChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={datos}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="fecha" />
      <YAxis dataKey="ingresos" />
      <Tooltip />
      <Bar dataKey="ingresos" fill="#2563eb" />
    </BarChart>
  </ResponsiveContainer>
)
