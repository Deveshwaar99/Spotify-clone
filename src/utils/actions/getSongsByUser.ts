'use server'

import { Song } from '@/types/types'
import { createClient } from '../supabase/server'

export async function getSongsByUser() {
  const supabase = createClient()
  const userData = await supabase.auth.getUser()
  const userId = userData.data.user?.id

  if (!userId) return []
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error in fetch songs by user Id--', error)
  }

  return (data as Song[]) || []
}
