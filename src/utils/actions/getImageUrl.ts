'use server'

import { Song } from '@/types/types'
import { createClient } from '../supabase/server'

export async function getImageUrl(song: Song) {
  const supabaseClient = createClient()

  if (!song) return ''

  const { data } = supabaseClient.storage.from('images').getPublicUrl(song.image_path)

  return data.publicUrl
}
