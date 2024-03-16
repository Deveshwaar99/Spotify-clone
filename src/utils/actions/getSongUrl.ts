'use server'

import { Song } from '@/types/types'
import { createClient } from '../supabase/server'

export async function getSongUrl(song: Song) {
  const supabaseClient = createClient()

  if (!song) return ''

  const { data } = supabaseClient.storage.from('songs').getPublicUrl(song.song_path)

  return data.publicUrl
}
