import { useClient } from '@/providers/SupabaseProvider'
import { useQuery } from '@tanstack/react-query'

import type { UserResponse } from '@supabase/supabase-js'
import type { Subscription } from '@/types/types'

export default function useUser() {
  const supabase = useClient()

  const getUser = async (): Promise<UserResponse> => await supabase.auth.getUser()
  const getSubscription = async (userId: string) => {
    return await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .eq('user_id', userId)
      .in('status', ['trialing', 'active'])
      .single()
  }
  const getUserDetails = async () => {
    const { data, error } = await getUser()
    if (error) {
      return { user: null, subscription: null }
    }
    const { user } = data
    const subscription = await getSubscription(user.id)
    if (subscription.error || !subscription.data) return { user, subscription: null }
    console.log('subscription is ', subscription.data)
    return { user, subscription: subscription.data as Subscription }
  }

  const { data, error, isFetching, status, isError } = useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails,
  })

  return {
    data,
    error,
    isFetching,
    status,
    isError,
  }
}
