import PriceCard from '@/components/shared/PriceCard'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Price, Subscription } from '@/types/types'
import getActiveProductsWithPrices from '@/utils/actions/getActiveProductsWithPrices'
import { createClient } from '@/utils/supabase/server'

async function PremiumPage() {
  const products = await getActiveProductsWithPrices()
  const supabaseClient = createClient()
  const { data, error } = await supabaseClient.auth.getUser()
  let subscription: Subscription | null = null
  if (data.user) {
    const { data: subscriptionData, error: SubscriptionError } = await supabaseClient
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .eq('user_id', data.user.id)
      .in('status', ['trialing', 'active'])
      .single()
    subscription = subscriptionData
  }
  // const handleCheckout = async (price: Price) => {
  //   'use server'
  //   if (!data.user) return { message: 'Must be logged in' }
  // }

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      {products.length > 0 ? (
        <Carousel className="w-full max-w-md">
          <CarouselContent>
            {products.map(product => {
              return (
                <CarouselItem key={product.id}>
                  <PriceCard
                    title={(product?.metadata && product.metadata.type) || ''}
                    price_value={(product?.prices && formatPrice(product.prices[0])) || ''}
                    currency={(product?.prices && product.prices[0].currency) || ''}
                    price={product?.prices && product.prices[0]}
                    subscription={subscription}
                  />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="text-center">No products available.</div>
      )}
    </div>
  )
}

export default PremiumPage

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}
