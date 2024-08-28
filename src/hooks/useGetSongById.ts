import { useClient } from '@/providers/SupabaseProvider'
import type { Song } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function useGetSongById(id?: string) {
  const supabaseClient = useClient()

  const fetchSongById = async () => {
    if (!id) return

    const { data, error } = await supabaseClient.from('songs').select('*').eq('id', id).single()

    if (error) {
      toast.error(error.message)
      throw new Error(error.message)
    }

    return data as Song
  }

  const { data: song, isLoading } = useQuery({
    queryKey: ['song', id],
    queryFn: fetchSongById,
    enabled: !!id,
  })
  return { song, isLoading }
}

export default useGetSongById
