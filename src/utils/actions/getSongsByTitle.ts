'use server'

import { Song } from '@/types/types'
import { createClient } from '../supabase/server'
import { getSongs } from './getSongs'

export async function getSongsByTitle(title: string) {
  const supabase = createClient()

  if (!title) {
    const allSongs = await getSongs()
    return allSongs
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
  }

  return (data as Song[]) || []
}
