import { DollarSign, CreditCard, RotateCcw, Receipt } from 'lucide-react'
import { formatearMoneda } from '@/lib/utils/formatters'

export interface DashboardMetricsProps {
  ingresos_totales: number
  numero_pagos: number
  numero_reembolsos: number
  ticket_medio: number
  moneda: string
}

export const DashboardMetrics = ({
  ingresos_totales,
  numero_pagos,
  numero_reembolsos,
  ticket_medio,
  moneda,
}: DashboardMetricsProps) => {
  const tarjetas = [
    {
      etiqueta: 'Ingresos totales',
      valor: formatearMoneda(ingresos_totales, moneda),
      Icono: DollarSign,
    },
    {
      etiqueta: 'Número de pagos',
      valor: numero_pagos.toString(),
      Icono: CreditCard,
    },
    {
      etiqueta: 'Reembolsos',
      valor: numero_reembolsos.toString(),
      Icono: RotateCcw,
    },
    {
      etiqueta: 'Ticket medio',
      valor: formatearMoneda(ticket_medio, moneda),
      Icono: Receipt,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tarjetas.map(({ etiqueta, valor, Icono }) => (
        <div
          key={etiqueta}
          data-testid="metrica-tarjeta"
          className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="rounded-full bg-gray-100 p-3 text-gray-700">
            <Icono className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{etiqueta}</p>
            <p className="text-2xl font-semibold text-gray-900">{valor}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
