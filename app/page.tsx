import { obtenerPagos } from '@/services/pagosService'
import {
  calcularIngresosTotales,
  contarPagos,
  contarReembolsos,
  calcularTicketMedio,
  detectarMonedaDominante,
} from '@/lib/utils/metrics'
import { DashboardMetrics } from '@/components/DashboardMetrics'
import { RevenueChart } from '@/components/RevenueChart'
import { FilterablePaymentTable } from '@/components/FilterablePaymentTable'

export default async function Home() {
  const pagos = await obtenerPagos()

  const ingresos_totales = calcularIngresosTotales(pagos)
  const numero_pagos = contarPagos(pagos)
  const numero_reembolsos = contarReembolsos(pagos)
  const ticket_medio = calcularTicketMedio(pagos)
  const monedaDominante = detectarMonedaDominante(pagos) || 'USD'

  const datosGrafico = pagos
    .filter(({ estado }) => estado === 'completed')
    .reduce<{ fecha: string; ingresos: number }[]>(
      (acc, { fecha_creacion, importe }) => {
        const fecha = fecha_creacion.slice(0, 10)
        const existente = acc.find((dato) => dato.fecha === fecha)

        if (existente) {
          existente.ingresos += importe
        } else {
          acc.push({ fecha, ingresos: importe })
        }

        return acc
      },
      [],
    )
    .sort((a, b) => a.fecha.localeCompare(b.fecha))

  const monedas = [...new Set(pagos.map(({ moneda }) => moneda))]

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Dashboard de pagos
      </h1>

      <DashboardMetrics
        ingresos_totales={ingresos_totales}
        numero_pagos={numero_pagos}
        numero_reembolsos={numero_reembolsos}
        ticket_medio={ticket_medio}
        moneda={monedaDominante}
      />

      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Ingresos por fecha
        </h2>
        <RevenueChart datos={datosGrafico} />
      </section>

      <FilterablePaymentTable pagos={pagos} monedas={monedas} />
    </main>
  )
}
