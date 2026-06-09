import { describe, it, expect } from 'vitest'
import { formatearMoneda, formatearFecha } from '../formatters'

const soloDigitos = (texto: string): string => texto.replace(/\D/g, '')

describe('formatearMoneda', () => {
  it('formatea COP con su símbolo', () => {
    const resultado = formatearMoneda(1500, 'COP')
    expect(resultado).toContain('$')
    expect(soloDigitos(resultado)).toContain('1500')
  })

  it('formatea USD con su símbolo', () => {
    const resultado = formatearMoneda(1500, 'USD')
    expect(resultado).toContain('$')
    expect(soloDigitos(resultado)).toContain('1500')
  })

  it('formatea EUR con su símbolo', () => {
    const resultado = formatearMoneda(1500, 'EUR')
    expect(resultado).toContain('€')
    expect(soloDigitos(resultado)).toContain('1500')
  })

  it('respeta el locale explícito por encima del inferido', () => {
    const resultado = formatearMoneda(1500, 'USD', 'es-ES')
    expect(resultado).toContain('US$')
    expect(soloDigitos(resultado)).toContain('1500')
  })

  it('no lanza excepción con moneda desconocida y usa el código', () => {
    const ejecutar = () => formatearMoneda(1500, 'JPY')
    expect(ejecutar).not.toThrow()
    expect(ejecutar()).toContain('¥')
  })
})

describe('formatearFecha', () => {
  it('formatea una fecha fija de forma legible en es-CO', () => {
    const resultado = formatearFecha(new Date(2024, 2, 15))
    expect(resultado).toContain('15')
    expect(resultado.toLowerCase()).toContain('mar')
    expect(resultado).toContain('2024')
  })

  it('acepta una cadena ISO y la formatea', () => {
    const resultado = formatearFecha('2024-03-15T12:00:00')
    expect(resultado).toContain('15')
    expect(resultado).toContain('2024')
  })

  it('respeta un locale explícito', () => {
    const resultado = formatearFecha(new Date(2024, 2, 15), 'en-US')
    expect(resultado).toContain('Mar')
    expect(resultado).toContain('2024')
  })
})
