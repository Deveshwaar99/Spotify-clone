'use client'
import React from 'react'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { SignUser } from '@/components/shared/SignUser'

function Login() {
  return (
    <div className="">
      {/* <h2 className="text-center text-3xl">Welcome back!</h2>
      <Auth
        supabaseClient={supabase}
        providers={['github']}
        magicLink={true}
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
      /> */}
      <main className="my-1 text-center text-4xl font-bold text-white">Welcome Back</main>
      <SignUser type="login" />
    </div>
  )
}

export default Login
