import { describe, it, expect } from 'vitest'
import {
  calcularIngresosTotales,
  contarPagos,
  contarReembolsos,
  calcularTicketMedio,
  detectarMonedaDominante,
  type PagoRegistro,
} from '../metrics'

const pagos: PagoRegistro[] = [
  { id_pago: 'p1', importe: 100, moneda: 'USD', estado: 'completed', fecha_creacion: '2024-01-01' },
  { id_pago: 'p2', importe: 200, moneda: 'USD', estado: 'completed', fecha_creacion: '2024-01-02' },
  { id_pago: 'p3', importe: 300, moneda: 'USD', estado: 'completed', fecha_creacion: '2024-01-03' },
  { id_pago: 'p4', importe: 50, moneda: 'USD', estado: 'refunded', fecha_creacion: '2024-01-04' },
  { id_pago: 'p5', importe: 80, moneda: 'USD', estado: 'refunded', fecha_creacion: '2024-01-05' },
  { id_pago: 'p6', importe: 999, moneda: 'USD', estado: 'pending', fecha_creacion: '2024-01-06' },
]

describe('calcularIngresosTotales', () => {
  it('suma únicamente los pagos completados', () => {
    expect(calcularIngresosTotales(pagos)).toBe(600)
  })

  it('ignora los estados refunded y pending', () => {
    const sinCompletados: PagoRegistro[] = [
      { id_pago: 'r1', importe: 500, moneda: 'USD', estado: 'refunded', fecha_creacion: '2024-02-01' },
      { id_pago: 'pe1', importe: 700, moneda: 'USD', estado: 'pending', fecha_creacion: '2024-02-02' },
    ]
    expect(calcularIngresosTotales(sinCompletados)).toBe(0)
  })
})

describe('contarPagos', () => {
  it('cuenta todos los registros sin filtrar por estado', () => {
    expect(contarPagos(pagos)).toBe(6)
  })
})

describe('contarReembolsos', () => {
  it('cuenta únicamente los registros refunded', () => {
    expect(contarReembolsos(pagos)).toBe(2)
  })
})

describe('calcularTicketMedio', () => {
  it('divide los ingresos entre el número de completados', () => {
    expect(calcularTicketMedio(pagos)).toBe(200)
  })

  it('retorna 0 cuando no hay registros completados', () => {
    const sinCompletados: PagoRegistro[] = [
      { id_pago: 'r1', importe: 500, moneda: 'USD', estado: 'refunded', fecha_creacion: '2024-02-01' },
      { id_pago: 'pe1', importe: 700, moneda: 'USD', estado: 'pending', fecha_creacion: '2024-02-02' },
    ]
    expect(calcularTicketMedio(sinCompletados)).toBe(0)
  })
})

describe('detectarMonedaDominante', () => {
  it('retorna la moneda más frecuente entre los completados', () => {
    const datos: PagoRegistro[] = [
      { id_pago: 'd1', importe: 10, moneda: 'USD', estado: 'completed', fecha_creacion: '2024-03-01' },
      { id_pago: 'd2', importe: 20, moneda: 'USD', estado: 'completed', fecha_creacion: '2024-03-02' },
      { id_pago: 'd3', importe: 30, moneda: 'COP', estado: 'completed', fecha_creacion: '2024-03-03' },
      { id_pago: 'd4', importe: 40, moneda: 'EUR', estado: 'refunded', fecha_creacion: '2024-03-04' },
    ]
    expect(detectarMonedaDominante(datos)).toBe('USD')
  })

  it('en caso de empate retorna la primera en orden alfabético', () => {
    const datos: PagoRegistro[] = [
      { id_pago: 'e1', importe: 10, moneda: 'USD', estado: 'completed', fecha_creacion: '2024-04-01' },
      { id_pago: 'e2', importe: 20, moneda: 'COP', estado: 'completed', fecha_creacion: '2024-04-02' },
      { id_pago: 'e3', importe: 30, moneda: 'EUR', estado: 'completed', fecha_creacion: '2024-04-03' },
    ]
    expect(detectarMonedaDominante(datos)).toBe('COP')
  })
})
