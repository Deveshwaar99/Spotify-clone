'use client'

import { ChevronLeft, ChevronRight, Home, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

type HeaderProps = {
  children: React.ReactNode
  className?: string
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter()
  const handleLogout = () => {
    //Logout fun
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
            onClick={router.back}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <Home size={20} className="text-black" />
          </button>
          <button
            onClick={router.back}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <Search size={20} className="text-black" />
          </button>
        </div>
        <div className="flex gap-x-4">
          <div>
            <Button onClick={() => {}} className="bg-transparent font-medium text-neutral-300">
              Sign up
            </Button>
          </div>
          <div>
            <Button onClick={() => {}} className="bg-white px-6 py-2">
              Log in
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
