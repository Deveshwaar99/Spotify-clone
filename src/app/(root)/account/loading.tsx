'use client'
import type { FC } from 'react'
import { BounceLoader } from 'react-spinners'

const Loading: FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <BounceLoader color="#22c55e" size={40} />
    </div>
  )
}

export default Loading
