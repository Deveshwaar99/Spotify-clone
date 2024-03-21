import { useClient } from '@/providers/SupabaseProvider'
import { Subscription } from '@/types/types'
import { User } from '@supabase/auth-helpers-nextjs'
import { useEffect, useRef, useState } from 'react'

type UserData =
  | {
      user: User
    }
  | {
      user: null
    }

export default function useUser() {
  const [userData, setUserData] = useState<UserData>({ user: null })
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabaseRef = useRef(useClient())

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabaseRef.current.auth.getUser()
        setUserData(data)
        if (data.user && data.user.id) {
          const getSubscription = (userId: string) =>
            supabaseRef.current
              .from('subscriptions')
              .select('*, prices(*, products(*))')
              .eq('user_id', userId)
              .in('status', ['trialing', 'active'])
              .single()
          const { data: subscriptionData } = await getSubscription(data.user?.id)
          setSubscription(subscriptionData)
        }
      } catch (err: any) {
        console.error('Error in fetching user data---', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user: userData.user, subscription, isLoading }
}
