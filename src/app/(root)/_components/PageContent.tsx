'use client'
import type { Song } from '@/types/types'
import SongItem from './SongItem'
import useOnPlay from '@/hooks/useOnPlay'

type PageContentProps = {
  songs: Song[] | []
}

function PageContent({ songs }: PageContentProps) {
  const { onPlay } = useOnPlay(songs)
  return (
    <>
      {songs.length === 0 ? (
        <div className="mt-4 text-neutral-400">No songs available.</div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {songs.map(item => (
            <SongItem
              key={item.id}
              onClick={id => {
                onPlay(id)
              }}
              data={item}
            />
          ))}
        </div>
      )}
    </>
  )
}
export default PageContent
