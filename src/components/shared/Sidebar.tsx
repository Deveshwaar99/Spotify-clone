'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { Song } from '@/types/types'
import { Home, Search } from 'lucide-react'
import Box from './Box'
import Library from './Library'
import SidebarItem from './SidebarItem'

type SidebarProps = {
  children: React.ReactNode
  songs: Song[] | []
}

function Sidebar({ children, songs }: SidebarProps) {
  const pathName = usePathname()
  const routes = useMemo(
    () => [
      {
        label: 'Home',
        isActive: pathName !== '/search',
        href: '/',
        icon: Home,
      },
      {
        label: 'Search',
        isActive: pathName === '/search',
        href: '/search',
        icon: Search,
      },
    ],
    [pathName]
  )
  return (
    <div className="flex h-screen">
      <div className="hidden h-full w-[300px] flex-col gap-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map(item => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}

export default Sidebar
