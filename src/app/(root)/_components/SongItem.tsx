'use client'
import Image from 'next/image'
import { Song } from '@/types/types'
import PlayButton from '@/components/shared/PlayButton'
import { useLoadImageUrl } from '@/hooks/useLoadImageUrl'

type SongItemProps = {
  data: Song
  onClick: (id: string) => void
}
function SongItem({ data, onClick }: SongItemProps) {
  let imagePath = useLoadImageUrl(data)
  return (
    <>
      <div
        onClick={() => onClick(data.id)}
        className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
      >
        <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
          <Image
            className="object-scale-down"
            src={imagePath || '/images/liked.png'}
            fill
            alt="Image"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-y-1 pt-4">
          <p className="w-full truncate font-semibold">{data.title}</p>
          <p className="w-full truncate pb-4 text-sm text-neutral-400">By {data.author}</p>
        </div>
        <div className="absolute bottom-24 right-5">
          <PlayButton />
        </div>
      </div>
      {}
    </>
  )
}

export default SongItem