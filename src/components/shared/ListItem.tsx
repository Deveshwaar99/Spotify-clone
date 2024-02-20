'use client'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type ListItemProps = {
  image: string
  name: string
  href: string
}
const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter()
  const onClick = () => {
    //Authentication befre push
    router.push(href)
  }
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-black bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image fill src={image} alt="like" className="object-cover" />
      </div>
      <p className="truncate py-5 font-medium">{name}</p>
      <div className="absolute right-5 flex items-center justify-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100">
        <Play />
      </div>
    </button>
  )
}

export default ListItem
