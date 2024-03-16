import { Song } from '@/types/types'
import { getSongUrl } from '@/utils/actions/getSongUrl'
import { useEffect, useMemo, useState } from 'react'

export function useLoadSongUrl(song: Song) {
  const [songUrl, setSongUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!song) return
    setIsLoading(true)
    async function fetchSongUrl() {
      const url = await getSongUrl(song)
      setSongUrl(url)
      setIsLoading(false)
    }
    fetchSongUrl()
  }, [song])

  return useMemo(() => ({ songUrl, isLoading }), [isLoading, songUrl])
}
export default useLoadSongUrl
