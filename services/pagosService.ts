import { supabase } from '@/lib/supabase'
import type { PagoRegistro } from '@/lib/utils/metrics'

export const obtenerPagos = async (): Promise<PagoRegistro[]> => {
  const { data, error } = await supabase.from('pagos').select('*')

  if (error) {
    console.error(error.message)
    return []
  }

  // El schema de la tabla `pagos` garantiza la forma de PagoRegistro.
  return (data ?? []) as PagoRegistro[]
}
