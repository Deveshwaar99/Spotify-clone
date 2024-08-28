'use client'

import { createClient } from '@/utils/supabase/client'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useEffect, useState } from 'react'

const SupabaseClientContext = createContext<SupabaseClient<any, 'public', any> | undefined>(
  undefined
)

type SupabaseProviderProps = {
  children: React.ReactNode
}

function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [supabaseClient] = useState(() => createClient())

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <SupabaseClientContext.Provider value={supabaseClient}>
      {children}
    </SupabaseClientContext.Provider>
  )
}

export default SupabaseProvider

export const useClient = () => {
  const context = useContext(SupabaseClientContext)
  if (context === undefined) {
    throw new Error('UserClient must be used within a SupabaseContextProvider.')
  }
  return context
}
