import { useClient } from '@/providers/SupabaseProvider'
import { Song } from '@/types/types'

export function useLoadImageUrl(song: Song) {
  const supabaseClient = useClient()
  if (!song) return

  const { data } = supabaseClient.storage.from('images').getPublicUrl(song.image_path)

  return data.publicUrl
}
