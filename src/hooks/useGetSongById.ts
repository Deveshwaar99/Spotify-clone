import { useClient } from '@/providers/SupabaseProvider'
import { Song } from '@/types/types'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

function useGetSongById(id?: string) {
  const [song, setSong] = useState<Song | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const supabaseClient = useClient()

  useEffect(() => {
    if (!id) return

    async function fetchSongById() {
      const { data, error } = await supabaseClient.from('songs').select('*').eq('id', id).single()

      if (error) {
        setIsLoading(false)
        return toast.error(error.message)
      }

      setSong(data as Song)
      setIsLoading(false)
    }

    fetchSongById()
  }, [id, supabaseClient])

  return useMemo(
    () => ({
      song,
      isLoading,
    }),
    [song, isLoading]
  )
}

export default useGetSongById
