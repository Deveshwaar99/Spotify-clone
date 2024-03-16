'use client'
import { Song } from '@/types/types'
import React, { useEffect, useState } from 'react'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Slider } from '../ui/slider'
import usePlayer from '@/hooks/usePlayer'
import useSound from 'use-sound'
type PlayerContentProps = {
  song: Song
  songUrl: string
}
function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const [volume, setVolume] = useState(0.4)
  const [isPlaying, setIsplaying] = useState(false)

  const player = usePlayer()
  const [play, { pause, sound }] = useSound(songUrl, {
    format: ['mp3'],
    volume: volume,
    onplay: () => setIsplaying(true),
    onend: () => {
      setIsplaying(false)
      onPlayNext()
    },
    onpause: () => setIsplaying(false),
  })

  const Icon = isPlaying ? Pause : Play
  let VolumeIcon

  if (volume === 0) {
    VolumeIcon = VolumeX
  } else if (volume <= 0.6) {
    VolumeIcon = Volume1
  } else VolumeIcon = Volume2

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0])
  }
  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }
  const toggleVolume = () => {
    if (volume === 0) return setVolume(0.5)
    setVolume(0)
  }

  const onPlayNext = () => {
    if (player.ids.length === 0 || !player.activeId) return

    const currentIndex = player.ids.indexOf(player.activeId)
    const nextSongIndex = currentIndex + 1
    if (!player.ids[nextSongIndex]) {
      return player.setId(player.ids[0])
    }
    player.setId(player.ids[nextSongIndex])
  }
  const onPlayPrevious = () => {
    if (player.ids.length === 0 || !player.activeId) return

    const currentIndex = player.ids.indexOf(player.activeId)
    const nextSongIndex = currentIndex - 1
    if (!player.ids[nextSongIndex]) {
      return player.setId(player.ids[player.ids.length - 1])
    }
    player.setId(player.ids[nextSongIndex])
  }

  useEffect(() => {
    sound?.play()
    return () => {
      sound?.unload()
    }
  }, [sound])
  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={() => {}} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      {/* Mobile view */}
      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon fill="black" />
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <SkipBack
          onClick={() => onPlayPrevious()}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
        <div
          onClick={() => {}}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Icon fill="black" onClick={() => handlePlay()} />
        </div>
        <SkipForward
          onClick={() => onPlayNext()}
          size={30}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="hidden w-full items-center justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon onClick={toggleVolume} size={34} className="cursor-pointer" />
          <Slider
            defaultValue={[0.4]}
            max={1}
            step={0.1}
            value={[volume]}
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
