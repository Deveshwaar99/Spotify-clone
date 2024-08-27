'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useUser from '@/hooks/useUser'
import { postData } from '@/lib/helpers'
import Button from '@/components/shared/Button'
import toast from 'react-hot-toast'

function AccountContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { data, isFetching, isError } = useUser()
  console.log('Subscription here ', data)

  if (isFetching) return <span className=" ml-6">Fetching subscription details...</span>
  if (!data || !data.user) return router.replace('/')
  if (isError) return toast.error('Uh oh! Something went wrong.')

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      })
      window.location.assign(url)
    } catch (error) {
      if (error) return alert((error as Error).message)
    }
    setLoading(false)
  }

  console.log('Subscription here ', data)
  return (
    <div className="mb-7 px-6">
      {!data.subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={() => router.push('/premium')} className="w-[300px]">
            Explore Spotify Premium
          </Button>
        </div>
      )}
      {data.subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the
            <b> {data.subscription.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isFetching}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent
