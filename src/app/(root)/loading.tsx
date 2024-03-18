'use client'
import { FC } from 'react'
import { BounceLoader } from 'react-spinners'

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex h-full items-center justify-center">
      <BounceLoader color="#22c55e" size={40} />
    </div>
  )
}

export default Loading
