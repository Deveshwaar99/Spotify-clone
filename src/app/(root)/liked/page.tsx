import Header from '@/components/shared/Header'
import { getLikedSongs } from '@/utils/actions/getLikedSongs'
import Image from 'next/image'
import React from 'react'
import LikedContent from './_components/LikedContent'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const revalidate = 5
async function LikedPage() {
  const supabaseClient = createClient()
  const { data } = await supabaseClient.auth.getUser()
  const user = data.user
  if (!user) {
    redirect('auth/login')
  }

  const songs = await getLikedSongs()
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col items-center gap-x-5 md:flex-row">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image className="object-cover" fill src="/images/liked.png" alt="Playlist" />
            </div>
            <div className="mt-4 flex flex-col gap-y-2 md:mt-0">
              <p className="hidden text-sm font-semibold md:block">Playlist</p>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">Liked Songs</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  )
}

export default LikedPage
