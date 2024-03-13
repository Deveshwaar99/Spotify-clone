'use client'

import useUser from '@/hooks/useUser'
import { useClient } from '@/providers/SupabaseProvider'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type LikeButtonProps = {
  songId: string
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter()
  const {
    userData: { user },
  } = useUser()
  const supabaseClient = useClient()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) {
      return
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user?.id])

  async function handleLike() {
    if (!user) {
      router.push('/login')
      return
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        // toast.error(error.message)
      } else {
        setIsLiked(false)
      }
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success('Success')
      }
    }

    router.refresh()
  }

  return (
    <button onClick={handleLike} className="cursor-pointer transition hover:opacity-75">
      {isLiked ? <Heart color="#22c55e" fill="#22c55e" size={25} /> : <Heart fill="#ffffff" />}
    </button>
  )
}
