"use client"

import { useState } from 'react'
import { PaymentTable } from '@/components/PaymentTable'
import type { PagoRegistro } from '@/lib/utils/metrics'

export interface FilterablePaymentTableProps {
  pagos: PagoRegistro[]
  monedas: string[]
}

export const FilterablePaymentTable = ({
  pagos,
  monedas,
}: FilterablePaymentTableProps) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('')
  const [monedaSeleccionada, setMonedaSeleccionada] = useState('todas')
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todos')

  const pagosFiltrados = pagos
    .filter(({ id_pago }) =>
      id_pago.toLowerCase().includes(terminoBusqueda.toLowerCase()),
    )
    .filter(({ moneda }) =>
      monedaSeleccionada === 'todas' ? true : moneda === monedaSeleccionada,
    )
    .filter(({ estado }) =>
      estadoSeleccionado === 'todos' ? true : estado === estadoSeleccionado,
    )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={terminoBusqueda}
          onChange={({ target }) => setTerminoBusqueda(target.value)}
          placeholder="Buscar por ID de pago..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:max-w-xs"
        />
        <select
          value={monedaSeleccionada}
          onChange={({ target }) => setMonedaSeleccionada(target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="todas">Todas las monedas</option>
          {monedas.map((moneda) => (
            <option key={moneda} value={moneda}>
              {moneda}
            </option>
          ))}
        </select>
        <select
          value={estadoSeleccionado}
          onChange={({ target }) => setEstadoSeleccionado(target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="todos">Todos</option>
          <option value="completed">Completed</option>
          <option value="refunded">Refunded</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <p className="text-sm text-gray-500">
        {pagosFiltrados.length} de {pagos.length} pagos
      </p>
      <PaymentTable pagos={pagosFiltrados} />
    </div>
  )
}
