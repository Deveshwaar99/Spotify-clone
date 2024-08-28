'use client'

import { useState } from 'react'
import Button from './Button'
import { Separator } from '@/components/ui/separator'
import { type Price, ProductWithPrice, type Subscription } from '@/types/types'
import useUser from '@/hooks/useUser'
import toast from 'react-hot-toast'
import { postData } from '@/lib/helpers'
import { useRouter } from 'next/navigation'

type PriceCardProps = {
  price: Price | undefined
  title: string
  price_value: string
  currency: string
  subscription: Subscription | null
  alreadySubscribed: boolean
}
function PriceCard({
  title,
  price_value,
  currency,
  price,
  subscription,
  alreadySubscribed,
}: PriceCardProps) {
  const router = useRouter()
  const { data: userData, isFetching, isError } = useUser()
  const [disabled, setDisabled] = useState(!title || !price_value || !currency)

  const handleSubscribe = async () => {
    setDisabled(true)
    if (!price) return
    if (!userData) {
      setDisabled(false)
      return toast.error('Must be logged in')
    }
    if (subscription) {
      setDisabled(false)
      return toast(`Already subscribed to ${subscription.prices?.products?.name}`)
    }
    try {
      const { sessionId, url } = await postData({
        url: '/api/create-checkout-session',
        data: { priceId: price.id },
      })
      if (!sessionId || !url) {
        setDisabled(false)
        return toast.error('Somthing went wrong please try again')
      }

      router.push(url)
    } catch (error) {
      toast.error('Somthing went wrong please try again')
      console.error(error)
      setDisabled(false)
    }
  }
  if (isError) return toast.error('Uh oh! Something went wrong.')
  return (
    <div className="relative m-4 w-[400px] rounded-2xl bg-[#242424] p-6 text-white">
      <div className="flex flex-col items-start">
        <div className="absolute left-0 top-0 rounded-xl rounded-bl-none rounded-tr-none bg-[#ffd2d7] p-1">
          <p className="mx-4 font-bold text-black">Free for 1 month</p>
        </div>
        <div className="mx-1 my-4 flex w-full flex-col items-start justify-start gap-y-6">
          <div className="mt-2">Spotify Premium</div>
          <div className="text-4xl font-bold text-[#ffd2d7]">{title.toUpperCase()}</div>
          <div className="flex flex-col items-start">
            <p className="text-lg text-white">Free for 1 month</p>
            <p className="text-sm text-neutral-400">
              {currency.toUpperCase()}
              {price_value} / month after
            </p>
          </div>
          <Separator className="h-[0.3px] bg-neutral-400 opacity-10" />
          <div className="flex justify-start">
            <ul className="mx-4 list-disc text-base">
              <li>1 Premium account</li>
              <li>Cancel anytime</li>
              <li>Subscribe or one-time payment</li>
            </ul>
          </div>
          <Button
            disabled={disabled || isFetching || alreadySubscribed}
            onClick={handleSubscribe}
            className="bg-[#ffd2d7] font-bold text-black"
          >
            {alreadySubscribed ? 'Already subscribed' : 'Subscribe'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PriceCard
