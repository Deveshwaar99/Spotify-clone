import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as HotToast } from 'react-hot-toast'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import { getSongsByUser } from '@/utils/actions/getSongsByUser'
import Player from '@/components/shared/Player'

export const revalidatePath = 120

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const songs = await getSongsByUser()
  return (
    <div className="m-0 h-full">
      <SupabaseProvider>
        <ModalProvider />
        <Sidebar songs={songs}>{children}</Sidebar>
        <Player />
        <Toaster />
        <HotToast />
      </SupabaseProvider>
    </div>
  )
}
