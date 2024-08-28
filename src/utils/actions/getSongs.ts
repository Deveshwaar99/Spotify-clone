'use server'

import type { Song } from '@/types/types'
import { createClient } from '../supabase/server'

export async function getSongs() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error in fetch songs--', error)
  }
  return data ? (data as Song[]) : []
}
