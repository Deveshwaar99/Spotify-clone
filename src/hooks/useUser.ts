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
  const [error, setError] = useState(null)
  const [statusChange, setStatusChange] = useState(false)
  const supabaseRef = useRef(useClient())
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabaseRef.current.auth.getUser()
        setUserData(data)
      } catch (err: any) {
        console.error('Error in fetching user data---', err)
      }
    }

    fetchUser()
  }, [statusChange])

  return { userData, setStatusChange }
}
