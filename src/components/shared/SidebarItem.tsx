import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type SidebarItemProps = {
  label: string
  href: string
  isActive: boolean
  icon: LucideIcon
}

function SidebarItem({ label, href, isActive, icon: Icon }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400',
        isActive && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">{label}</p>
    </Link>
  )
}

export default SidebarItem
