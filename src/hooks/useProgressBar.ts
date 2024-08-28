import type { Song } from '@/types/types'
import { useEffect, useRef, useState } from 'react'

export default function useProgressBar(sound: Howl | null) {
  const [currentDuration, setCurrentDuration] = useState(0)
  const progressBarRef = useRef<number | null>(null)
  useEffect(() => {
    const getCurrentProgress = () => {
      if (sound) {
        setCurrentDuration(sound.seek() || 0)
      }
      progressBarRef.current = requestAnimationFrame(getCurrentProgress)
    }

    const startProgressBar = () => {
      if (!progressBarRef.current) {
        progressBarRef.current = requestAnimationFrame(getCurrentProgress)
      }
    }
    const stopProgressBar = () => {
      if (progressBarRef.current) {
        cancelAnimationFrame(progressBarRef.current)
        progressBarRef.current = null
      }
    }

    startProgressBar()

    return () => {
      stopProgressBar()
    }
  }, [sound])

  return { currentDuration, setCurrentDuration }
}
