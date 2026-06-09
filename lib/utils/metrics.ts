export interface PagoRegistro {
  id_pago: string
  importe: number
  moneda: string
  estado: 'completed' | 'refunded' | 'pending'
  fecha_creacion: string
}

const soloCompletados = (pagos: PagoRegistro[]): PagoRegistro[] =>
  pagos.filter(({ estado }) => estado === 'completed')

export const calcularIngresosTotales = (pagos: PagoRegistro[]): number =>
  soloCompletados(pagos).reduce((total, { importe }) => total + importe, 0)

export const contarPagos = (pagos: PagoRegistro[]): number => pagos.length

export const contarReembolsos = (pagos: PagoRegistro[]): number =>
  pagos.filter(({ estado }) => estado === 'refunded').length

export const calcularTicketMedio = (pagos: PagoRegistro[]): number => {
  const completados = soloCompletados(pagos)

  if (completados.length === 0) {
    return 0
  }

  return calcularIngresosTotales(pagos) / completados.length
}

export const detectarMonedaDominante = (pagos: PagoRegistro[]): string => {
  const frecuencias = soloCompletados(pagos).reduce<Record<string, number>>(
    (acc, { moneda }) => {
      acc[moneda] = (acc[moneda] ?? 0) + 1
      return acc
    },
    {},
  )

  return Object.keys(frecuencias)
    .sort((a, b) => a.localeCompare(b))
    .reduce((dominante, moneda) => {
      if (dominante === '') {
        return moneda
      }
      return frecuencias[moneda] > frecuencias[dominante] ? moneda : dominante
    }, '')
}
