import { Volume1, Volume2, VolumeX, type LucideIcon } from 'lucide-react'
import { useState } from 'react'

export default function useVolume(initialVolume: number) {
  const [volume, setVolume] = useState(initialVolume)

  const getVolumeIcon = (): LucideIcon => {
    if (volume === 0) return VolumeX
    if (volume <= 0.6) return Volume1
    return Volume2
  }
  const VolumeIcon: LucideIcon = getVolumeIcon()

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0])
  }
  const toggleVolume = () => {
    setVolume(volume === 0 ? 0.5 : 0)
  }

  return { volume, setVolume, handleVolumeChange, toggleVolume, VolumeIcon }
}
