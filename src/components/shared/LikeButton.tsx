'use client'

import useUser from '@/hooks/useUser'
import { useClient } from '@/providers/SupabaseProvider'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type LikeButtonProps = {
  songId: string
  defaultState?: boolean
}

export default function LikeButton({ songId, defaultState }: LikeButtonProps) {
  const router = useRouter()
  const supabaseClient = useClient()
  const queryClient = useQueryClient()
  const { data: userData } = useUser()

  const getSongLikeStatus = async () => {
    if (!userData) return false
    try {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('created_at')
        .eq('user_id', userData.user.id)
        .eq('song_id', songId)
      if (error || !data.length) return false
    } catch (error) {
      console.error('Error in getting like status,', error)
      return false
    }
    return true
  }

  const { data: isLiked, isLoading: isLikeLoading } = useQuery({
    queryKey: ['LikedSongs', songId, userData?.user.id],
    queryFn: getSongLikeStatus,
    enabled: !!userData?.user.id,
    initialData: defaultState,
  })

  const handleLikeButtonClick = async () => {
    try {
      if (!userData) throw new Error('User not logged in')
      if (isLiked) {
        const { error } = await supabaseClient
          .from('liked_songs')
          .delete()
          .eq('user_id', userData.user.id)
          .eq('song_id', songId)
        if (error) throw error
      } else {
        const { error } = await supabaseClient.from('liked_songs').insert({
          song_id: songId,
          user_id: userData.user.id,
        })
        if (error) throw error
      }
    } catch (error) {
      toast.error('Something went wrong!')
      throw error
    }
  }

  const likeMutation = useMutation({
    mutationFn: handleLikeButtonClick,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['LikedSongs', songId, userData?.user.id] })
      const previousValue = queryClient.getQueryData(['LikedSongs', songId, userData?.user.id])
      queryClient.setQueryData(['LikedSongs', songId, userData?.user.id], !previousValue)

      return { previousValue }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['LikedSongs', songId, userData?.user.id], context?.previousValue)
      toast.error('Failed to update like status.')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['LikedSongs', songId, userData?.user.id] })
    },
  })

  function handleLike() {
    if (!userData?.user) {
      router.push('/login')
      return
    }
    likeMutation.mutate()
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isLikeLoading}
      className="cursor-pointer transition hover:opacity-75"
    >
      {isLiked ? <Heart color="#22c55e" fill="#22c55e" size={25} /> : <Heart fill="#ffffff" />}
    </button>
  )
}
