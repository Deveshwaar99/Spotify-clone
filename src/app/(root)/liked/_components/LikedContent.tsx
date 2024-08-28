'use client'

import LikeButton from '@/components/shared/LikeButton'
import MediaItem from '@/components/shared/MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import type { Song } from '@/types/types'

interface LikedContentProps {
  songs: Song[]
}

function LikedContent({ songs }: LikedContentProps) {
  const { onPlay } = useOnPlay(songs)
  if (songs.length === 0) {
    return <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">No liked songs.</div>
  }
  return (
    <div className="flex w-full flex-col gap-y-2 p-6">
      {songs.map((song: Song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => {
                onPlay(id)
              }}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent
