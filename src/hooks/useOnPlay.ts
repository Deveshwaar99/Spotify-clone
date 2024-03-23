import { useRouter } from 'next/navigation'
import usePlayer from './usePlayer'
import useUser from './useUser'
import { Song } from '@/types/types'

function useOnPlay(songs: Song[]) {
  const { user } = useUser()
  const player = usePlayer()

  const router = useRouter()

  function onPlay(id: string) {
    if (!user) return router.push('/auth/login')
    player.setIds(songs.map(item => item.id))
    player.setId(id)
  }
  return { onPlay }
}
export default useOnPlay
