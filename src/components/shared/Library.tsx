'use client'
import { useUploadModal } from '@/hooks/useUploadModal'
import useUser from '@/hooks/useUser'
import { Song } from '@/types/types'
import { Library as LibraryIcon, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MediaItem from './MediaItem'

type LibraryProps = {
  songs: Song[] | []
}
function Library({ songs }: LibraryProps) {
  const { user, isLoading } = useUser()

  const uploadModal = useUploadModal()
  const router = useRouter()
  function onClick() {
    if (!user && !isLoading) {
      return router.push('/auth/login')
    }
    //TODO:CHECK FOR SUBSCRIPTION
    uploadModal.onOpen()
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <LibraryIcon size={26} className="text-neutral-400" />
          <p className="text-base font-medium text-neutral-400">Your Library</p>
        </div>
        <Plus
          onClick={onClick}
          size={20}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map(item => (
          <MediaItem key={item.id} onClick={() => {}} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Library
