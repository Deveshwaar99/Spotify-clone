import { useClient } from '@/providers/SupabaseProvider'
import type { Subscription } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

export default function useUser() {
  const supabase = useClient()

  const getUserDetails = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    const { user } = userData

    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .eq('user_id', user.id)
      .in('status', ['trialing', 'active'])
      .single()

    if (subscriptionError) {
      console.error('Subscription fetch error:', subscriptionError)
      return { user, subscription: null }
    }

    return { user, subscription: subscriptionData as Subscription }
  }

  return useQuery({
    queryKey: ['userDetails'],
    queryFn: getUserDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
