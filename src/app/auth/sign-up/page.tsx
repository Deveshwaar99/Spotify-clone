'use client'

import { createClient } from '@/utils/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

function SignUpPage() {
  const supabase = createClient()
  return (
    <div>
      <main className="my-1 px-4 py-2 text-center text-4xl font-bold text-white sm:px-6 lg:px-8">
        <div className="flex flex-col text-left">
          <p>Signup to start</p>
          <p>Listening</p>
        </div>
      </main>
      <div className="">
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
        />
      </div>
    </div>
  )
}

export default SignUpPage
