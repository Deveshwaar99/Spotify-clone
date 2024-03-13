'use server'
import { createClient } from '../supabase/server'

export async function getLikedSongs() {
  try {
    const supabase = createClient()
    const { data: userData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      throw new Error('Auth Error')
    }
    const userId = userData.user.id
    if (!userId) {
      return []
    }

    const { data, error } = await supabase
      .from('liked_songs')
      .select('*, songs(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) {
      console.error(error)
      return []
    }
    const songs = data.map(item => item.songs)
    return (songs as any[]) || []
  } catch (error: any) {
    console.error('Error in getting liked songs', error?.message)
    return []
  }
}
