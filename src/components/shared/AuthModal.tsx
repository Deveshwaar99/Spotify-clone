'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { useAuthModal } from '@/hooks/useAuthModal'
import Modal from './Modal'

import { useEffect } from 'react'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useClient } from '@/providers/SupabaseProvider'

const AuthModal = () => {
  const { onClose, isOpen } = useAuthModal()
  const router = useRouter()

  const supabase = useClient()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (user) {
      router.refresh()
      onClose()
    }
  }, [router, onClose, user])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
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
        redirectTo="/"
      />
    </Modal>
  )
}

export default AuthModal
