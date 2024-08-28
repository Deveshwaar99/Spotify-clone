'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { useAuthModal } from '@/hooks/useAuthModal'
import Modal from './Modal'

import useUser from '@/hooks/useUser'
import { useClient } from '@/providers/SupabaseProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AuthModal = () => {
  const { onClose, isOpen } = useAuthModal()
  const router = useRouter()

  const supabaseClient = useClient()
  const { data: userData } = useUser()
  useEffect(() => {
    if (userData) {
      onClose()
    }
  }, [onClose, userData])

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
    </Modal>
  )
}

export default AuthModal
