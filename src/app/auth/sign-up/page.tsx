'use client'
import React, { useEffect } from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// import { SignUser } from '@/components/shared/SignUser'
import { createClient } from '@/utils/supabase/client'
import { getURL } from '@/lib/helpers'
import { useRouter } from 'next/navigation'

function Login() {
  const supabaseClient = createClient()
  const redirectUrl = getURL()

  const router = useRouter()
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.push(redirectUrl)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [redirectUrl, supabaseClient.auth, router])
  return (
    <div className="">
      <h2 className="text-center text-3xl">Welcome back!</h2>
      <Auth
        supabaseClient={supabaseClient}
        providers={['github']}
        magicLink={true}
        localization={{
          variables: {
            sign_up: {
              confirmation_text: 'Click in the link in your email and login again',
            },
          },
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
        theme="dark"
      />
      {/* <main className="my-1 text-center text-4xl font-bold text-white">Welcome Back</main> */}
      {/* <SignUser type="login" /> */}
    </div>
  )
}

export default Login
