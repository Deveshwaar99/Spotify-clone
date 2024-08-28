'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import usePlayer from '@/hooks/usePlayer'
import { useMemo } from 'react'
import { ScaleLoader } from 'react-spinners'
import PlayerContent from './PlayerContent'

function Player() {
  const player = usePlayer()
  const { song, isLoading: isSongLoading } = useGetSongById(player.activeId)
  const { data: songUrl, isLoading: isSongUrlLoading } = useLoadSongUrl(song)

  const isLoading = isSongLoading || isSongUrlLoading
  const shouldRender = useMemo(() => {
    return song && songUrl && player.activeId
  }, [song, songUrl, player.activeId])

  if (isLoading)
    return (
      <div className="flex h-[80px] items-center justify-center bg-neutral-900">
        <ScaleLoader color="#22c55e" />
      </div>
    )

  if (!shouldRender) return null

  if (!song || !songUrl || !player.activeId) return null

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
