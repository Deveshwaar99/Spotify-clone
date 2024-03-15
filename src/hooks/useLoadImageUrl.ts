import { Song } from '@/types/types'
import { getImageUrl } from '@/utils/actions/getImageUrl'
import { useEffect, useMemo, useState } from 'react'

export function useLoadImageUrl(song: Song) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!song) return
    setIsLoading(true)
    async function fetchImageUrl() {
      const url = await getImageUrl(song)
      setImageUrl(url)
      setIsLoading(false)
    }
    fetchImageUrl()
  }, [song])

  return useMemo(() => ({ imageUrl, isLoading }), [isLoading, imageUrl])
}
