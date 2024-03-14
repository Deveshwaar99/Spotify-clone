import { useClient } from '@/providers/SupabaseProvider'
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
  const [isLoading, setIsLoading] = useState(true)

  const supabaseRef = useRef(useClient())

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabaseRef.current.auth.getUser()
        setUserData(data)
      } catch (err: any) {
        console.error('Error in fetching user data---', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user: userData.user, isLoading }
}
