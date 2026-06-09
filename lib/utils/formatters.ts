const LOCALES_POR_MONEDA: Record<string, string> = {
  COP: 'es-CO',
  USD: 'en-US',
  EUR: 'es-ES',
}

export const formatearMoneda = (
  importe: number,
  moneda: string,
  locale?: string,
): string => {
  const localeFinal = locale ?? LOCALES_POR_MONEDA[moneda] ?? 'en-US'

  return new Intl.NumberFormat(localeFinal, {
    style: 'currency',
    currency: moneda,
  }).format(importe)
}

export const formatearFecha = (
  fecha: string | Date,
  locale = 'es-CO',
): string => {
  const valor = fecha instanceof Date ? fecha : new Date(fecha)

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(valor)
}
