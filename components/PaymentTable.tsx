import { formatearMoneda, formatearFecha } from '@/lib/utils/formatters'
import type { PagoRegistro } from '@/lib/utils/metrics'

export interface PaymentTableProps {
  pagos: PagoRegistro[]
}

const ESTILOS_ESTADO: Record<PagoRegistro['estado'], string> = {
  completed: 'bg-green-100 text-green-800',
  refunded: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
}

export const PaymentTable = ({ pagos }: PaymentTableProps) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50 text-left text-gray-500">
        <tr>
          <th className="px-4 py-3 font-medium">ID Pago</th>
          <th className="px-4 py-3 font-medium">Importe</th>
          <th className="px-4 py-3 font-medium">Moneda</th>
          <th className="px-4 py-3 font-medium">Estado</th>
          <th className="px-4 py-3 font-medium">Fecha</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {pagos.map(({ id_pago, importe, moneda, estado, fecha_creacion }) => (
          <tr key={id_pago}>
            <td className="px-4 py-3 text-gray-900">{id_pago}</td>
            <td className="px-4 py-3 text-gray-900">
              {formatearMoneda(importe, moneda)}
            </td>
            <td className="px-4 py-3 text-gray-700">{moneda}</td>
            <td className="px-4 py-3">
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTILOS_ESTADO[estado]}`}
              >
                {estado}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-700">
              {formatearFecha(fecha_creacion)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
