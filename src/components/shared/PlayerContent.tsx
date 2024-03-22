'use client'
import { Song } from '@/types/types'
import React, { useEffect, useMemo, useState } from 'react'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Slider } from '../ui/slider'
import usePlayer from '@/hooks/usePlayer'
import useSound from 'use-sound'
import { formatDuration } from '@/lib/helpers'
import ProgressBar from './ProgressBar'
type PlayerContentProps = {
  song: Song
  songUrl: string
}
function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const [volume, setVolume] = useState(0.4)
  const [isPlaying, setIsplaying] = useState(false)
  const [currentDuration, setCurrentDuration] = useState(0)

  const player = usePlayer()
  //creating the sound object and recieving player controllers
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

  const formattedDuration = useMemo(() => formatDuration((duration || 0) / 1000), [duration])
  const formattedCurrentDuration = formatDuration(currentDuration)
  console.log(formattedCurrentDuration)

  const Icon = isPlaying ? Pause : Play

  //volume controls
  let VolumeIcon

  if (volume === 0) {
    VolumeIcon = VolumeX
  } else if (volume <= 0.6) {
    VolumeIcon = Volume1
  } else VolumeIcon = Volume2

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0])
  }
  const toggleVolume = () => {
    if (volume === 0) return setVolume(0.5)
    setVolume(0)
  }

  //Play controls
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

  //Progress controls

  const onProgressChange = (newTime: number) => {
    sound?.seek(newTime)
    setCurrentDuration(newTime)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setCurrentDuration(sound.seek() || 0)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sound])

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
            onClick={() => {}}
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
