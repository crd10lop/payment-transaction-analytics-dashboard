import { supabase } from '@/lib/supabase'
import type { PagoRegistro } from '@/lib/utils/metrics'

interface PagoFila {
  id_pago: string
  importe: number
  moneda: string
  estado: PagoRegistro['estado']
  fecha: string | null
  created_at: string
}

export const obtenerPagos = async (): Promise<PagoRegistro[]> => {
  const { data, error } = await supabase
    .from('pagos')
    .select('id_pago, importe, moneda, estado, fecha, created_at')

  if (error) {
    console.error(error.message)
    return []
  }

  // El select fija las columnas consultadas, garantizando la forma de PagoFila.
  const filas = (data ?? []) as PagoFila[]

  return filas.map(({ id_pago, importe, moneda, estado, fecha, created_at }) => ({
    id_pago,
    importe,
    moneda,
    estado,
    fecha_creacion: fecha ?? created_at,
  }))
}
