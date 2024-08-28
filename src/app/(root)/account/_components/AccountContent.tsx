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
  const { data: userData, isLoading, isError } = useUser()

  useEffect(() => {
    if (!userData && !isLoading) {
      router.replace('/')
    }
  }, [userData, isLoading, router])

  useEffect(() => {
    if (isError) {
      toast.error('Uh oh! Something went wrong.')
    }
  }, [isError])

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      })
      if (error) {
        throw new Error(error)
      }
      window.location.assign(url)
    } catch (error) {
      alert((error as Error).message)
      setLoading(false) // Set loading to false only if there's an error
    }
  }

  if (isLoading) return <span className="ml-6">Fetching subscription details...</span>

  return (
    <div className="mb-7 px-6">
      {!userData?.subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={() => router.push('/premium')} className="w-[300px]">
            Explore Spotify Premium
          </Button>
        </div>
      )}
      {userData?.subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the
            <b> {userData.subscription.prices?.products?.name} </b>
            plan.
          </p>
          <Button disabled={loading} onClick={redirectToCustomerPortal} className="w-[300px]">
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent
