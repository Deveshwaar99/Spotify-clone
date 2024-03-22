import React from 'react'
import { Slider } from '../ui/slider'
import { twMerge } from 'tailwind-merge'

type ProgressBarProps = {
  formattedCurrentDuration: string
  formattedDuration: string
  duration: number
  currentDuration: number
  onProgressChange: (newDuration: number) => void
  className?: string
}
function ProgressBar({
  formattedCurrentDuration,
  formattedDuration,
  duration,
  currentDuration,
  onProgressChange,
  className,
}: ProgressBarProps) {
  return (
    <>
      <div
        className={twMerge(
          'flex w-[313px] items-center justify-center gap-x-3 md:w-[608px]',
          className
        )}
      >
        <p className="text-xs text-neutral-400">{formattedCurrentDuration}</p>
        <Slider
          max={Math.floor(duration || 0) / 1000}
          value={[Math.floor(currentDuration)]}
          onValueChange={value => onProgressChange(value[0])}
          className="h-4"
        />
        <p className="text-xs text-neutral-400">{formattedDuration}</p>
      </div>
    </>
  )
}

export default ProgressBar
