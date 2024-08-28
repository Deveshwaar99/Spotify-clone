import type { Song } from '@/types/types'
import { getSongUrl } from '@/utils/actions/getSongUrl'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export function useLoadSongUrl(song: Song | undefined) {
  return useQuery({
    queryKey: ['songUrl', song?.id],
    queryFn: async () => {
      if (!song) return null
      return await getSongUrl(song)
    },
    enabled: !!song,
  })
}
export default useLoadSongUrl
