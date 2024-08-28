import PriceCard from '@/components/shared/PriceCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Price, Subscription } from '@/types/types'
import getActiveProductsWithPrices from '@/utils/actions/getActiveProductsWithPrices'
import { createClient } from '@/utils/supabase/server'

async function PremiumPage() {
  const products = await getActiveProductsWithPrices()
  const supabaseClient = createClient()
  const { data, error } = await supabaseClient.auth.getUser()
  const subscription = data.user
    ? await supabaseClient
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .eq('user_id', data.user.id)
        .in('status', ['trialing', 'active'])
        .single()
        .then(res => {
          if (res.error) {
            console.error('Error fetching subscription:', res.error)
            return null
          }
          return res.data as Subscription
        })
    : null

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      {products.length > 0 ? (
        <Carousel className="w-full max-w-md">
          <CarouselContent>
            {products.map(product => {
              return (
                <CarouselItem key={product.id}>
                  <PriceCard
                    title={product?.metadata?.type || ''}
                    price_value={(product?.prices && formatPrice(product.prices[0])) || ''}
                    currency={product?.prices?.[0].currency || ''}
                    price={product?.prices?.[0]}
                    subscription={subscription}
                    alreadySubscribed={
                      subscription ? subscription.price_id === product.prices?.[0].id : false
                    }
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
