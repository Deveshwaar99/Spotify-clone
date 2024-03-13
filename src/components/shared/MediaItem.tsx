import { Song } from '@/types/types'
import Image from 'next/image'

type MediaItemProps = {
  onClick: () => void
  data: Song
}
function MediaItem({ onClick, data }: MediaItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
    >
      <div className="overflow-hidden rounded-md bg-orange-300">
        <Image
          className="object-cover"
          src={'/images/jailer.jpg'}
          width={32}
          height={28}
          alt="Image"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{data.title}</p>
        <p className="truncate text-sm text-neutral-400">By {data.author}</p>
      </div>
    </div>
  )
}

export default MediaItem
