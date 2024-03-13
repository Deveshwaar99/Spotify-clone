'use client'

import { ChevronLeft, ChevronRight, Home, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import toast from 'react-hot-toast'

import useUser from '@/hooks/useUser'
import { useClient } from '@/providers/SupabaseProvider'

type HeaderProps = {
  children: React.ReactNode
  className?: string
}

const Header = ({ children, className }: HeaderProps) => {
  const {
    userData: { user },
    setStatusChange,
  } = useUser()
  const router = useRouter()

  const supabase = useClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      toast.success('Logout success')
      setStatusChange(prev => !prev)
      router.refresh()
    } else {
      toast.error('Uh oh! Something went wrong.')
    }
  }

  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800  p-6', className)}>
      <div className="mb-4 flex w-full items-center justify-between">
        {/* Medium screen */}
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onClick={router.back}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <ChevronLeft size={35} className="text-white" />
          </button>
          <button
            onClick={router.forward}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <ChevronRight size={35} className="text-white" />
          </button>
        </div>
        {/* Mobile screen */}
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <Home size={20} className="text-black" />
          </button>
          <button
            onClick={() => router.push('/search')}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <Search size={20} className="text-black" />
          </button>
        </div>
        <div className="flex items-center gap-x-4 text-black">
          {user !== null ? (
            <>
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button onClick={() => router.push('/account')} className="rounded-full bg-white p-2">
                <User />
              </Button>
            </>
          ) : (
            <>
              <Button className="text-nowrap bg-transparent font-medium text-neutral-300">
                Sign up
              </Button>
              <Button onClick={() => router.push('/auth/login')} className="bg-white px-6 py-2">
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
