'use client'
import usePlayer from '@/hooks/usePlayer'
import useProgressBar from '@/hooks/useProgressBar'
import useVolume from '@/hooks/useVolume'
import { formatDuration } from '@/lib/helpers'
import type { Song } from '@/types/types'
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound'
import { Slider } from '../ui/slider'
import LikeButton from './LikeButton'
import MediaItem from './MediaItem'
import ProgressBar from './ProgressBar'
type PlayerContentProps = {
  song: Song
  songUrl: string
}
function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const { volume, toggleVolume, handleVolumeChange, VolumeIcon } = useVolume(0.4)
  const [isPlaying, setIsplaying] = useState(true)
  const player = usePlayer()

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    format: ['mp3'],
    volume: volume,
    onplay: () => setIsplaying(true),
    onend: () => {
      setIsplaying(false)
      onPlayNext()
    },
    onpause: () => setIsplaying(false),
  })

  const { currentDuration, setCurrentDuration } = useProgressBar(sound)

  const formattedDuration = useMemo(() => formatDuration((duration || 0) / 1000), [duration])
  const formattedCurrentDuration = formatDuration(currentDuration)

  const Icon = isPlaying ? Pause : Play

  useEffect(() => {
    sound?.play()
    return () => {
      sound?.unload()
    }
  }, [sound])

  // Play controls
  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
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

  // Progress controls
  const onProgressChange = (newTime: number) => {
    sound?.seek(newTime)
    setCurrentDuration(newTime)
  }

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={() => {}} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      {/* Mobile view */}
      {/* <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon fill="black" onClick={() => handlePlay()} />
        </div>
      </div> */}

      {/* desktop view */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-2">
        <div className="flex max-w-[722px] items-center justify-center gap-x-6">
          <SkipBack
            onClick={() => onPlayPrevious()}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />

          <div
            // onClick={() => {}}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <Icon fill="black" size={25} onClick={() => handlePlay()} />
          </div>
          <SkipForward
            onClick={() => onPlayNext()}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
        </div>
        <ProgressBar
          formattedCurrentDuration={formattedCurrentDuration}
          formattedDuration={formattedDuration}
          currentDuration={currentDuration}
          duration={duration || 0}
          onProgressChange={onProgressChange}
          className="hidden md:flex"
        />
      </div>

      <div className="hidden w-full items-center justify-end md:flex">
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
