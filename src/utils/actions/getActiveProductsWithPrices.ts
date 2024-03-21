import { ProductWithPrice } from '@/types/types'
import { createClient } from '../supabase/server'

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select(
      `
    *,
    prices (
      *
    )
  `
    )
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices', ascending: true })

  if (error) {
    console.error(error.message)
  }

  return (data as any) || []
}

export default getActiveProductsWithPrices
